import { Tag } from 'modules/app/types/tag.dt';

// TODO: This data should come from a prefetched static file.

export function getPollTags(): Tag[] {
  return [
    {
      id: 'surplus',
      shortname: 'Surplus',
      longname: 'System Surplus',
      recommend_ui: true,
      description: 'Changes to the System Surplus Buffer',
      related_link: 'https://manual.makerdao.com/parameter-index/core/param-system-surplus-buffer'
    },
    {
      id: 'oracle',
      shortname: 'Oracle',
      longname: 'Oracle',
      recommend_ui: true,
      description: "Polls concerning MakerDAO's Oracles"
    },
    {
      id: 'oracle-whitelist',
      shortname: 'ORA Whitelist',
      longname: 'Oracle Whitelist',
      recommend_ui: true,
      description: 'Oracle Whitelist proposals'
    },
    {
      id: 'oracle-feed',
      shortname: 'ORA Feed',
      longname: 'Oracle Feed',
      recommend_ui: true,
      description: 'Oracle Feed Onboarding and Offboarding'
    },
    {
      id: 'technical',
      shortname: 'Tech',
      longname: 'Technical',
      recommend_ui: true,
      description: 'Polls relating to technical changes to the Maker Protocol'
    },
    {
      id: 'real-world-assets',
      shortname: 'RWA',
      longname: 'Real World Asset',
      recommend_ui: true,
      description: 'Polls relating to Real World Assets in the Maker Protocol'
    },
    {
      id: 'black-thursday',
      shortname: 'Black Thu',
      longname: 'Black Thursday',
      recommend_ui: true,
      description: 'Polls relating to Black Thursday'
    },
    {
      id: 'misc-governance',
      shortname: 'Misc Gov',
      longname: 'Misc Governance',
      recommend_ui: true,
      description: 'Miscellaneous Polls related to Governance'
    },
    {
      id: 'mcd-launch',
      shortname: 'MCD Launch',
      longname: 'Multi-Collateral DAI Launch',
      recommend_ui: false,
      description: 'Polls relating to the launch of Multi-Collateral DAI'
    },
    {
      id: 'delegates',
      shortname: 'Delegates',
      longname: 'Delegates',
      recommend_ui: true,
      description: "Polls relating to MakerDAO's Recognized Delegates",
      related_link: 'https://manual.makerdao.com/governance/what-is-delegation'
    },
    {
      id: 'greenlight',
      shortname: 'Greenlight',
      longname: 'Greenlight',
      recommend_ui: true,
      description: 'Polls relating to the collateral application greenlight process',
      related_link: 'https://mips.makerdao.com/mips/details/MIP9'
    },
    {
      id: 'collateral-onboard',
      shortname: 'Collateral On',
      longname: 'Collateral Onboarding',
      recommend_ui: true,
      description: 'Polls relating to the onboarding of collateral into the Maker Protocol',
      related_link: 'https://collateral.makerdao.com/'
    },
    {
      id: 'misc-funding',
      shortname: 'Misc Fund',
      longname: 'Misc Funding',
      recommend_ui: true,
      description: 'Polls related to miscellaneous funding proposals'
    },
    {
      id: 'risk-parameter',
      shortname: 'Parameter',
      longname: 'Risk Parameter',
      recommend_ui: true,
      description: 'Polls that change risk parameters within the Maker Protocol'
    },
    {
      id: 'ratification',
      shortname: 'Ratification',
      longname: 'Ratification Poll',
      recommend_ui: true,
      description: 'Ratification Polls as defined in MIP51',
      related_link: 'https://mips.makerdao.com/mips/details/MIP51#MIP51c2'
    },
    {
      id: 'inclusion',
      shortname: 'Inclusion',
      longname: 'Inclusion Poll',
      recommend_ui: false,
      description: 'Inclusion Polls as defined in MIP3 (obsolete)',
      related_link: 'https://mips.makerdao.com/mips/details/MIP3'
    },
    {
      id: 'mips',
      shortname: 'MIP',
      longname: 'MIP',
      recommend_ui: true,
      description: 'Polls related to the Maker Improvement Proposal Process defined in MIP0',
      related_link: 'https://mips.makerdao.com/mips/details/MIP0'
    },
    {
      id: 'auctions',
      shortname: 'Auction',
      longname: 'Auction',
      recommend_ui: true,
      description: 'Polls related to auctions and auction parameters in the Maker Protocol'
    },
    {
      id: 'dsr',
      shortname: 'DSR',
      longname: 'Dai Savings Rate',
      recommend_ui: true,
      description: 'Polls affecting the Dai Savings Rate',
      related_link: 'https://manual.makerdao.com/parameter-index/core/param-dai-savings-rate'
    },
    {
      id: 'momc',
      shortname: 'MOMC',
      longname: 'MakerDAO Open Market Committee',
      recommend_ui: true,
      description: 'Proposals made by the MakerDAO Open Market Committee',
      related_link: 'https://forum.makerdao.com/tag/ppg-omc-001'
    },
    {
      id: 'budget',
      shortname: 'Budget',
      longname: 'Budget',
      recommend_ui: true,
      description: "Budget proposals made by MakerDAO's Core Units",
      related_link: 'https://mips.makerdao.com/mips/details/MIP40'
    },
    {
      id: 'collateral-offboard',
      shortname: 'Collateral Off',
      longname: 'Collateral Offboarding',
      recommend_ui: true,
      description: 'Polls relating to the offboarding of collateral into the Maker Protocol',
      related_link: 'https://mips.makerdao.com/mips/details/MIP62'
    },
    {
      id: 'core-unit-onboard',
      shortname: 'CU On',
      longname: 'Core Unit Onboarding',
      recommend_ui: true,
      description: 'Proposals to onboard new Core Units into MakerDAO',
      related_link: 'https://mips.makerdao.com/mips/details/MIP39'
    },
    {
      id: 'bridge',
      shortname: 'Bridge',
      longname: 'Multi-Chain Bridge',
      recommend_ui: true,
      description: 'Polls relating to the bridging of DAI and the Maker Protocol to other chains'
    },
    {
      id: 'd3m',
      shortname: 'D3M',
      longname: 'DAI Direct Deposit Module',
      recommend_ui: true,
      description: 'Polls relating to changes or onboarding of DAI Direct Deposit Modules',
      related_link: 'https://manual.makerdao.com/module-index/module-dai-direct-deposit'
    },
    {
      id: 'psm',
      shortname: 'PSM',
      longname: 'Peg Stability Module',
      recommend_ui: true,
      description: 'Polls relating to changes or onboarding of Peg Stability Modules',
      related_link: 'https://manual.makerdao.com/module-index/module-psm'
    }
  ];
}
