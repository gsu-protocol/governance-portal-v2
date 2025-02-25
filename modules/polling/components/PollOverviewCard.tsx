import React from 'react';
import { Icon } from '@makerdao/dai-ui-icons';
import { Card, Text, Flex, Box, Button, ThemeUIStyleObject, Divider, Badge } from 'theme-ui';
import shallow from 'zustand/shallow';
import {
  isActivePoll,
  isResultDisplayApprovalBreakdown,
  isResultDisplayInstantRunoffBreakdown,
  isResultDisplaySingleVoteBreakdown
} from 'modules/polling/helpers/utils';
import CountdownTimer from 'modules/app/components/CountdownTimer';
import { InternalLink } from 'modules/app/components/InternalLink';
import { Poll } from 'modules/polling/types';
import { useBreakpointIndex } from '@theme-ui/match-media';
import QuickVote from './poll-vote-input/QuickVote';
import { PollCategoryTag } from './PollCategoryTag';
import { PluralityVoteSummary } from './vote-summary/PluralityVoteSummary';
import PollWinningOptionBox from './PollWinningOptionBox';
import { formatDateWithTime } from 'lib/datetime';
import { usePollTally } from '../hooks/usePollTally';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { CardTitle } from 'modules/app/components/Card/CardTitle';
import { CardHeader } from 'modules/app/components/Card/CardHeader';
import { CardSummary } from 'modules/app/components/Card/CardSummary';
import CommentCount from 'modules/comments/components/CommentCount';
import { usePollComments } from 'modules/comments/hooks/usePollComments';
import { useAccount } from 'modules/app/hooks/useAccount';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import useUiFiltersStore from 'modules/app/stores/uiFilters';
import { ListVoteSummary } from './vote-summary/ListVoteSummary';
import { PollVoteTypeIndicator } from './PollOverviewCard/PollVoteTypeIndicator';

type Props = {
  poll: Poll;
  reviewPage: boolean;
  sx?: ThemeUIStyleObject;
  showVoting?: boolean;
  children?: React.ReactNode;
  hideTally?: boolean;
};
export default function PollOverviewCard({
  poll,
  reviewPage,
  showVoting,
  children,
  hideTally = false
}: Props): JSX.Element {
  const { account } = useAccount();
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const canVote = !!account && isActivePoll(poll);
  const showQuickVote = canVote && showVoting;
  const { comments, error: errorComments } = usePollComments(poll.pollId);
  const { tally, error: errorTally, isValidating } = usePollTally(hideTally ? 0 : poll.pollId);
  const [categoryFilter, setCategoryFilter] = useUiFiltersStore(
    state => [state.pollFilters.categoryFilter, state.setCategoryFilter],
    shallow
  );

  function onClickCategory(category) {
    setCategoryFilter({ ...categoryFilter, [category.id]: !(categoryFilter || {})[category.id] });
  }

  const myComment = comments?.find(c => {
    return c.comment.hotAddress.toLowerCase() === account?.toLowerCase();
  });

  const hasPollComments = comments && comments.length > 0;
  const hasUserComments = hasPollComments && myComment;

  return (
    <Card
      data-testid="poll-overview-card"
      aria-label="Poll overview"
      sx={{
        p: [0, 0]
      }}
    >
      <ErrorBoundary componentName="Poll Card">
        <Flex sx={{ flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <Box
            sx={{
              px: [3, 4],
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Flex
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                minHeight: ['auto', 210],
                height: '100%'
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  {bpi === 0 && (
                    <Box sx={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'nowrap' }}>
                      <CountdownTimer endText="Poll ended" endDate={poll.endDate} />
                    </Box>
                  )}
                  <Box>
                    <Box>
                      <CardHeader
                        text={`Posted ${formatDateWithTime(poll.startDate)} | Poll ID ${poll.pollId}`}
                        styles={{ mb: 2 }}
                      />
                      <InternalLink href={`/polling/${poll.slug}`} title="View poll details">
                        <CardTitle title={poll.title} dataTestId="poll-overview-card-poll-title" />
                      </InternalLink>
                    </Box>
                    <InternalLink href={`/polling/${poll.slug}`} title="View poll details">
                      <CardSummary text={poll.summary} styles={{ my: 2 }} />
                    </InternalLink>
                  </Box>

                  <Flex sx={{ flexWrap: 'wrap' }}>
                    {poll.tags.map(c => (
                      <Box key={c.id} sx={{ marginRight: 2, marginBottom: 2 }}>
                        <PollCategoryTag onClick={() => onClickCategory(c)} tag={c} />
                      </Box>
                    ))}
                  </Flex>
                </Box>
                {bpi > 0 && (
                  <Flex mt={3} sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box>
                      <ErrorBoundary componentName="Countdown Timer">
                        <CountdownTimer endText="Poll ended" endDate={poll.endDate} />
                      </ErrorBoundary>
                    </Box>
                    <Flex sx={{ gap: 2, flexWrap: 'wrap' }}>
                      {hasPollComments && (
                        <InternalLink href={`/polling/${poll.slug}`} title="View comments" hash="comments">
                          <CommentCount count={comments.length} />
                        </InternalLink>
                      )}
                      {hasUserComments && (
                        <InternalLink href={`/polling/${poll.slug}`} title="Your Comment" hash="comments">
                          <Flex sx={{ alignItems: 'center', gap: 2 }}>
                            <Icon name="yourComment" color="primary" size={3} />
                            <Text variant="caps" color="primary">
                              Your Comment
                            </Text>
                          </Flex>
                        </InternalLink>
                      )}
                      {errorComments && (
                        <Badge
                          variant="warning"
                          sx={{
                            color: 'warning',
                            borderColor: 'warning',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            m: 1
                          }}
                        >
                          Error loading comments
                        </Badge>
                      )}
                    </Flex>
                  </Flex>
                )}
              </Flex>
              {showQuickVote && bpi > 0 && (
                <Box sx={{ ml: 2, minWidth: '265px' }}>
                  <ErrorBoundary componentName="Vote in Poll">
                    <Box sx={{ maxWidth: 7 }}>
                      <QuickVote poll={poll} showStatus={!reviewPage} />
                    </Box>
                  </ErrorBoundary>
                </Box>
              )}
            </Flex>

            <Box>
              <Flex
                sx={{
                  alignItems: 'flex-end',
                  mt: 2,
                  justifyContent: 'space-between',
                  flexDirection: ['column', 'row']
                }}
              >
                <Flex
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: bpi > 0 ? 'auto' : '100%',
                    p: 0
                  }}
                >
                  <InternalLink href={`/polling/${poll.slug}`} title="View poll details">
                    <Button
                      variant="outline"
                      sx={{
                        display: reviewPage ? 'none' : undefined
                      }}
                    >
                      View Details
                    </Button>
                  </InternalLink>

                  {bpi === 0 && <PollVoteTypeIndicator poll={poll} />}
                </Flex>

                {showQuickVote && bpi === 0 && (
                  <Box sx={{ mt: 3, width: '100%' }}>
                    <ErrorBoundary componentName="Vote in Poll">
                      <QuickVote poll={poll} showStatus={!reviewPage} />
                    </ErrorBoundary>
                  </Box>
                )}

                <Box sx={{ width: bpi > 0 ? '265px' : '100%' }}>
                  {bpi > 0 && (
                    <Flex sx={{ justifyContent: 'flex-end' }}>
                      <PollVoteTypeIndicator poll={poll} />
                    </Flex>
                  )}
                  {tally && tally.totalMkrParticipation > 0 && (
                    <InternalLink
                      href={`/polling/${poll.slug}`}
                      hash="vote-breakdown"
                      title="View poll vote breakdown"
                    >
                      <Box sx={{ mt: 2 }}>
                        <ErrorBoundary componentName="Poll Results">
                          {isResultDisplaySingleVoteBreakdown(poll.parameters) ? (
                            <PluralityVoteSummary tally={tally} showTitles={false} />
                          ) : !isResultDisplayApprovalBreakdown(poll.parameters) ? (
                            <ListVoteSummary
                              choices={tally.results.map(i => i.optionId)}
                              poll={poll}
                              limit={3}
                              showOrdinal={isResultDisplayInstantRunoffBreakdown(poll.parameters)}
                            />
                          ) : null}
                        </ErrorBoundary>
                      </Box>
                    </InternalLink>
                  )}
                  {!tally && isValidating && !errorTally && (
                    <SkeletonThemed width={'265px'} height={'30px'} />
                  )}
                  {errorTally && !isValidating && (
                    <Badge
                      variant="warning"
                      sx={{
                        color: 'warning',
                        borderColor: 'warning',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        m: 1
                      }}
                    >
                      Error loading votes
                    </Badge>
                  )}
                </Box>
              </Flex>
            </Box>

            {children && <Box>{children}</Box>}
          </Box>

          {tally && (
            <Flex sx={{ flexDirection: 'column', justifySelf: 'flex-end' }}>
              <Divider my={0} />
              <ErrorBoundary componentName="Poll Winning Option">
                <PollWinningOptionBox tally={tally} poll={poll} />
              </ErrorBoundary>
            </Flex>
          )}
        </Flex>
      </ErrorBoundary>
    </Card>
  );
}
