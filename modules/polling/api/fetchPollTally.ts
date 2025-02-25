import { SupportedNetworks } from 'modules/web3/constants/networks';
import { Poll, PollTally, PollTallyOption, VictoryCondition } from 'modules/polling/types';
import { extractWinnerPlurality } from './victory_conditions/plurality';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { voteMkrWeightsAtTimeRankedChoice } from 'modules/gql/queries/voteMkrWeightsAtTimeRankedChoice';
import { PollVictoryConditions } from '../polling.constants';
import { ParsedSpockVote, SpockVote } from '../types/tallyVotes';
import BigNumber from 'lib/bigNumberJs';
import { extractWinnerApproval } from './victory_conditions/approval';
import { extractWinnerMajority } from './victory_conditions/majority';
import { extractWinnerInstantRunoff } from './victory_conditions/instantRunoff';
import { extractWinnerDefault } from './victory_conditions/default';
import { InstantRunoffResults } from '../types/instantRunoff';
import { parseRawOptionId } from '../helpers/parseRawOptionId';
import { extractSatisfiesComparison } from './victory_conditions/comparison';
import { hasVictoryConditionInstantRunOff } from '../helpers/utils';
import { isExponential } from 'lib/utils';

type WinnerOption = { winner: number | null; results: InstantRunoffResults | null };

export function findWinner(condition: VictoryCondition, votes: ParsedSpockVote[], poll: Poll): WinnerOption {
  let results: InstantRunoffResults | null = null;

  switch (condition.type) {
    case PollVictoryConditions.approval:
      return {
        winner: extractWinnerApproval(votes),
        results
      };
    case PollVictoryConditions.majority:
      return { winner: extractWinnerMajority(votes, condition.percent), results };
    case PollVictoryConditions.plurality:
      return { winner: extractWinnerPlurality(votes), results };
    case PollVictoryConditions.instantRunoff:
      results = extractWinnerInstantRunoff(votes);
      return { winner: results ? results.winner : null, results };
    case PollVictoryConditions.default:
      return { winner: extractWinnerDefault(poll, condition.value), results };
    // In case comparison is set on the top level instead of inside a AND logic.
    // Inside of an AND logic, comparison is set as a filter to be complied with
    // on the top level we would take the first option that passes this condition and declare it a winner
    case PollVictoryConditions.comparison:
      return {
        winner:
          extractSatisfiesComparison(votes, condition.comparator, condition.value).length > 0
            ? extractSatisfiesComparison(votes, condition.comparator, condition.value)[0]
            : null,
        results
      };
    default:
      return {
        winner: null,
        results
      };
  }
}

export async function fetchPollTally(poll: Poll, network: SupportedNetworks): Promise<PollTally> {
  // Fetch spock votes for the poll
  const data = await gqlRequest({
    chainId: networkNameToChainId(network),
    query: voteMkrWeightsAtTimeRankedChoice,
    variables: {
      argPollId: poll.pollId,
      argUnix: new Date(poll.endDate).getTime() / 1000
    }
  });

  const spockVotes: SpockVote[] = data.voteMkrWeightsAtTimeRankedChoice.nodes;

  // Transform the votes
  // extract the ballot or single votes based on the poll input format:
  const votes: ParsedSpockVote[] = spockVotes.map(vote => {
    return {
      ...vote,
      optionIdRaw: vote.optionIdRaw.toString(),
      ballot: parseRawOptionId(vote.optionIdRaw.toString())
    };
  });

  // Abstain
  const abstain = poll.parameters.inputFormat.abstain ? poll.parameters.inputFormat.abstain : [0];

  let totalMkrParticipation = new BigNumber(0);
  let totalMkrActiveParticipation = new BigNumber(0);

  // Remove all the votes that voted "Abstain" in any option. (It should only be 1 abstain option)
  const filteredVotes = votes.filter(vote => {
    // Store the total GSUp
    totalMkrParticipation = totalMkrParticipation.plus(vote.mkrSupport);
    if (vote.ballot.filter(i => abstain.indexOf(i) !== -1).length > 0) {
      return false;
    }

    totalMkrActiveParticipation = totalMkrActiveParticipation.plus(vote.mkrSupport);

    return true;
  });

  let winnerOption: WinnerOption = { winner: null, results: null };

  let victoryConditionMatched: number | null = null;

  // Victory conditions work like an "if-else", if the first does not find a winner, we move to the next one
  poll.parameters.victoryConditions.forEach((victoryGroup, index) => {
    // A winner has been found, skip.
    if (winnerOption.winner) {
      return;
    }

    if (victoryGroup.type === PollVictoryConditions.and) {
      // If all the winners are the same, and a winner is found, declare this the winner.
      let allTheSame = true;
      let allWinners = true;

      let andWinner: WinnerOption | null = null;

      victoryGroup.conditions.forEach(condition => {
        // Comparison is a filter
        if (condition.type === PollVictoryConditions.comparison) {
          // Comparison returns an array of options that satisfy the condition
          const satisfiesConditions = extractSatisfiesComparison(
            filteredVotes,
            condition.comparator,
            condition.value
          );
          if (satisfiesConditions.length === 0) {
            allWinners = false;
          }

          if (!andWinner?.winner) {
            andWinner = {
              winner: satisfiesConditions.length > 0 ? satisfiesConditions[0] : null,
              results: null
            };
          } else {
            // There's no winner that satisfies conditions
            if (satisfiesConditions.indexOf(andWinner.winner) === -1) {
              allTheSame = false;
            }
          }
          return;
        }

        // For all the other conditions except comparison, we find the winner and compare.
        const winnerOptionAnd = findWinner(condition, filteredVotes, poll);
        if (!winnerOptionAnd.winner) {
          allWinners = false;
          return;
        }

        if (andWinner && andWinner.winner !== winnerOptionAnd.winner) {
          allTheSame = false;
          return;
        }

        if (!andWinner) {
          andWinner = winnerOptionAnd;
        }
      });

      if (allTheSame && allWinners && andWinner) {
        winnerOption = andWinner;
        victoryConditionMatched = index;
      }
    } else {
      const winnerGroup = findWinner(victoryGroup, filteredVotes, poll);
      if (winnerGroup.winner) {
        winnerOption = winnerGroup;
        victoryConditionMatched = index;
      }
    }
  });

  // Format results
  const votesInfo: { [key: number]: BigNumber } = {};

  // needs to consider IRV without comparator threshold met when aggregating GSUp
  const isIrv = hasVictoryConditionInstantRunOff(poll.parameters.victoryConditions);

  // Aggregate the GSUp support
  votes.forEach(vote => {
    // if IRV and no winner, only consider weight from first ballot option
    if (isIrv && !winnerOption.results) {
      if (votesInfo[vote.ballot[0]]) {
        votesInfo[vote.ballot[0]] = votesInfo[vote.ballot[0]].plus(vote.mkrSupport);
      } else {
        votesInfo[vote.ballot[0]] = new BigNumber(vote.mkrSupport);
      }
    } else {
      // otherwise aggregate all votes
      vote.ballot.forEach(votedOption => {
        if (votesInfo[votedOption]) {
          votesInfo[votedOption] = votesInfo[votedOption].plus(vote.mkrSupport);
        } else {
          votesInfo[votedOption] = new BigNumber(vote.mkrSupport);
        }
      });
    }
  });

  // Form the results structure
  const results: PollTallyOption[] = Object.keys(poll.options)
    .map(key => {
      const optionId = parseInt(key);
      const instantRunoffOption = winnerOption.results?.options[optionId];

      // To get the real GSUp support we need to get the one extracted from the ranked results, for instant-runoff, since
      // it will count the firstChoice GSUp support based on the algorithm. Except for abstain
      // for other algorithms we just use the accumulated GSUp

      const isAbstainOption = poll.parameters.inputFormat.abstain.indexOf(parseInt(key)) !== -1;

      const mkrSupport =
        winnerOption.results && !isAbstainOption
          ? instantRunoffOption?.mkrSupport || new BigNumber(0)
          : votesInfo[optionId] || new BigNumber(0);

      let firstPct: string | number = 0;
      let transferPct: string | number = 0;

      if (totalMkrParticipation.gt(0)) {
        const firstPctBn = new BigNumber(mkrSupport).div(totalMkrParticipation).times(100);

        // If firstPct has too many decimal places it will be cast as an exponential number, in which case we instead cast as a string
        firstPct = isExponential(firstPctBn.toNumber()) ? firstPctBn.toFixed(18) : firstPctBn.toNumber();

        if (instantRunoffOption?.transfer) {
          const transferPctBn = new BigNumber(instantRunoffOption?.transfer)
            .div(totalMkrParticipation)
            .times(100);

          // Same situation for transferPct, cast as a string with regular notation if necessary
          transferPct = isExponential(transferPctBn.toNumber())
            ? transferPctBn.toFixed(18)
            : transferPctBn.toNumber();
        }
      }

      return {
        optionId,
        winner: winnerOption.winner === optionId,
        mkrSupport: mkrSupport.toString(),
        optionName: poll.options[optionId],
        eliminated: instantRunoffOption?.eliminated,
        transfer: instantRunoffOption?.transfer?.toString(),
        firstPct,
        transferPct
      };
    })
    .sort((a, b) => {
      const valueA = new BigNumber(a.mkrSupport).plus(a.transfer || 0);
      const valueB = new BigNumber(b.mkrSupport).plus(b.transfer || 0);
      if (valueA.eq(valueB)) return a.optionName > b.optionName ? 1 : -1;
      return valueA.gt(valueB) ? -1 : 1;
    });

  const tally: PollTally = {
    parameters: poll.parameters,
    winner: winnerOption.winner ? winnerOption.winner : null,
    victoryConditionMatched,
    numVoters: spockVotes.length,
    totalMkrParticipation: totalMkrParticipation.toString(),
    totalMkrActiveParticipation: totalMkrActiveParticipation.toString(),
    winningOptionName: winnerOption.winner ? poll.options[winnerOption.winner] : 'None found',
    results,
    rounds: winnerOption.results?.rounds
  };

  return tally;
}
