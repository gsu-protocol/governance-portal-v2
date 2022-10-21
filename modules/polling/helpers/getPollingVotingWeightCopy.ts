export const getPollingVotingWeightCopy = (isVotingDelegate: boolean): string =>
  isVotingDelegate
    ? 'Your polling voting weight is made up of the GSUp delegated to your delegate contract. This amount is applied to all polls you vote on.'
    : 'Your polling voting weight is made up of the GSUp in your wallet, vote proxy, and voting contract. This amount is applied to all polls you vote on.';
