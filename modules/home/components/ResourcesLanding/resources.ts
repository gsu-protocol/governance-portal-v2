export enum ResourceCategory {
  ALL_RESOURCES = 'All Resources',
  GOVERNANCE = 'Governance',
  PRODUCTS_AND_TOOLS = 'Products & Tools',
  DEVELOPERS = 'Developers'
}

enum ResourceBackground {
  GOVERNANCE = 'linear-gradient(260.14deg, #DEE8C4 0%, #d42f5d 97.43%)',
  PRODUCTS_AND_TOOLS = 'linear-gradient(260.14deg, #E2CCFF 0%, #df567c 97.43%)',
  DEVELOPERS = 'linear-gradient(260.14deg, #F4B7FE 0%, #d42f5d 97.43%)'
}

export enum ResourceColor {
  GOVERNANCE = '#d42f5d',
  PRODUCTS_AND_TOOLS = '#df567c',
  DEVELOPERS = '#e94a7433'
}

type LandingResource = {
  title: string;
  url: string;
  category: ResourceCategory;
  bg: string;
  color: string;
  logo: string;
  summary: string;
};

export const resources: LandingResource[] = [
  {
    title: 'GSU protocol Governance Forum',
    url: 'https://forum.gsuprotocol.io/',
    category: ResourceCategory.GOVERNANCE,
    bg: ResourceBackground.GOVERNANCE,
    color: ResourceColor.GOVERNANCE,
    logo: '/assets/resource_icon_1.svg',
    summary: 'Participate in or start new discussions related to the governance of GSU protocol.'
  },
  {
    title: 'GSU protocol Operation Manual',
    url: 'https://manual.gsuprotocol.io',
    category: ResourceCategory.GOVERNANCE,
    bg: ResourceBackground.GOVERNANCE,
    color: ResourceColor.GOVERNANCE,
    logo: '/assets/resource_icon_2.svg',
    summary:
      'Documentation on the GSU protocol processes, written for GSUp holders that actively participate in governance.'
  },
  {
    title: 'Governance Tracking Sheet',
    url: 'https://docs.google.com/spreadsheets/d/1LWNlv6hr8oXebk8rvXZBPRVDjN-3OrzI0IgLwBVk0vM/edit#gid=0',
    category: ResourceCategory.GOVERNANCE,
    bg: ResourceBackground.GOVERNANCE,
    color: ResourceColor.GOVERNANCE,
    logo: '/assets/resource_icon_3.svg',
    summary:
      'A daily updated breakdown of the current and future governance actions taking place in GSU protocol.'
  },
  {
    title: 'gsucoin',
    url: 'https://gsuprotocol.io/',
    category: ResourceCategory.PRODUCTS_AND_TOOLS,
    bg: ResourceBackground.PRODUCTS_AND_TOOLS,
    color: ResourceColor.PRODUCTS_AND_TOOLS,
    logo: '/assets/resource_icon_4.svg',
    summary:
      'The most popular user interface for interacting with the GSU protocol, used for creating & managing vaults.'
  },
  {
    title: 'Auctions Dashboard',
    url: 'http://unified-auctions.gsuprotocol.io',
    category: ResourceCategory.PRODUCTS_AND_TOOLS,
    bg: ResourceBackground.PRODUCTS_AND_TOOLS,
    color: ResourceColor.PRODUCTS_AND_TOOLS,
    logo: '/assets/resource_icon_5.svg',
    summary: 'A unified dashboard for understanding & interacting with auctions of the GSU protocol.'
  },
  // {
  //   title: 'GSU Burn',
  //   url: 'https://makerburn.com/#/',
  //   category: ResourceCategory.PRODUCTS_AND_TOOLS,
  //   bg: ResourceBackground.PRODUCTS_AND_TOOLS,
  //   color: ResourceColor.PRODUCTS_AND_TOOLS,
  //   logo: '/assets/resource_icon_6.svg',
  //   summary: 'A data dashboard for the GSU protocol, displaying burn rate, revenues, expenses and more.'
  // },
  {
    title: 'Technical Docs',
    url: 'https://docs.gsuprotocol.io/',
    category: ResourceCategory.DEVELOPERS,
    bg: ResourceBackground.DEVELOPERS,
    color: ResourceColor.DEVELOPERS,
    logo: '/assets/resource_icon_7.svg',
    summary:
      'Technical documentation about the GSU protocol protocol, covering all its mechanisms, smart contracts and more.'
  },
  {
    title: 'GSU protocol GitHub',
    url: 'https://github.com/gsu-protocol/',
    category: ResourceCategory.DEVELOPERS,
    bg: ResourceBackground.DEVELOPERS,
    color: ResourceColor.DEVELOPERS,
    logo: '/assets/resource_icon_8.svg',
    summary:
      'GitHub organization with many repositories relevant to GSU protocol and goverance, including the community repo and the codebase for this site.'
  },
  {
    title: 'API Docs',
    url: '/api-docs',
    category: ResourceCategory.DEVELOPERS,
    bg: ResourceBackground.DEVELOPERS,
    color: ResourceColor.DEVELOPERS,
    logo: '/assets/resource_icon_9.svg',
    summary:
      'Automatically generated API documentation for the Governance Portal API, used to query GSU protocol governance data.'
  }
];
