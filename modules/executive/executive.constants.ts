import { config } from "lib/config";

const githubRepo = {
  owner: config.EXECUTIVE_GITHUB_OWNER,
  repo: config.EXECUTIVE_GITHUB_REPO,
  branch: config.EXECUTIVE_GITHUB_BRANCH,
  page: config.EXECUTIVE_GITHUB_PAGE
};

export const EXEC_PROPOSAL_INDEX =
  `https://raw.githubusercontent.com/${githubRepo.owner}/${githubRepo.repo}/${githubRepo.branch}/governance/votes/active/proposals.json`;

// export const EXEC_PROPOSAL_INDEX =
// 'https://raw.githubusercontent.com/makerdao/community/master/governance/votes/active/proposals.json';


export const EXEC_PAGE_SIZE = 10;
