import { ParsedSpockVote } from 'modules/polling/types/tallyVotes';
import BigNumber from 'lib/bigNumberJs';

export function extractWinnerApproval(currentVotes: ParsedSpockVote[]): number | null {
  if (currentVotes.length === 0) {
    return null;
  }

  const votes: { [key: number]: BigNumber } = {};

  currentVotes.forEach(vote => {
    vote.ballot.forEach(votedOption => {
      if (votes[votedOption]) {
        votes[votedOption] = votes[votedOption].plus(vote.mkrSupport);
      } else {
        votes[votedOption] = new BigNumber(vote.mkrSupport);
      }
    });
  });

  // Sort options by GSUp support
  const sortedOptions = Object.keys(votes)
    .map(option => {
      return {
        option: parseInt(option),
        mkrSupport: votes[parseInt(option)]
      };
    })
    .sort((prev, next) => {
      return prev.mkrSupport.isGreaterThan(next.mkrSupport) ? -1 : 1;
    });

  // if the 2 first options share the same GSUp amount, return null
  if (sortedOptions.length >= 2) {
    if (sortedOptions[0].mkrSupport.isEqualTo(sortedOptions[1].mkrSupport)) {
      return null;
    }
  }

  const winner = sortedOptions.length > 0 ? sortedOptions[0].option : null;
  return winner;
}
