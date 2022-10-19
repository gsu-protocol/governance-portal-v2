import { cacheGet, cacheSet } from 'modules/cache/cache';
import { Tag } from 'modules/app/types/tag';

import pollTags from 'modules/tags/constants/poll-tags-definitions.json';
import pollTagsMapping from 'modules/tags/constants/poll-tags-mapping.json';
import { pollTagsMappingJSONCacheKey } from 'modules/cache/constants/cache-keys';
import { config } from 'lib/config';
export function getPollTags(): Tag[] {
  return pollTags;
}

export async function getPollTagsMapping(): Promise<{ [key: number]: string[] }> {
  try {

    const githubRepo = {
      owner: config.EXECUTIVE_GITHUB_OWNER,
      repo: config.EXECUTIVE_GITHUB_REPO,
      branch: config.EXECUTIVE_GITHUB_BRANCH,
      page: config.EXECUTIVE_GITHUB_PAGE
    };

    const existingTags = await cacheGet(pollTagsMappingJSONCacheKey);

    if (existingTags) {
      return JSON.parse(existingTags);
    }

    // 'https://raw.githubusercontent.com/makerdao/community/master/governance/polls/meta/poll-tags.json';
    const urlPollTags =
      `https://raw.githubusercontent.com/${githubRepo.owner}/${githubRepo.repo}/${githubRepo.branch}/governance/polls/meta/poll-tags.json`;

    const pollTags = await fetch(urlPollTags);
    const dataPollTags = await pollTags.json();
    cacheSet(pollTagsMappingJSONCacheKey, JSON.stringify(dataPollTags));

    return dataPollTags;
  } catch (e) {
    return pollTagsMapping;
  }
}
