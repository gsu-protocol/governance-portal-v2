import { config } from 'lib/config';
import { SupportedNetworks } from 'modules/web3/constants/networks';

export type RepositoryInfo = {
  owner: string;
  repo: string;
  page: string;
};

export function getDelegatesRepositoryInformation(network: SupportedNetworks): RepositoryInfo {

  const repoMainnet = {
    owner: config.EXECUTIVE_GITHUB_OWNER,
    repo: config.EXECUTIVE_GITHUB_REPO,
    branch: config.EXECUTIVE_GITHUB_BRANCH,
    page: 'governance/delegates'
  };


  const repoTest = {
    owner: 'block360',
    repo: 'voting-delegates',
    page: 'delegates'
  };

  const delegatesRepositoryInfo = network === SupportedNetworks.MAINNET ? repoMainnet : repoTest;
  return delegatesRepositoryInfo;
}
