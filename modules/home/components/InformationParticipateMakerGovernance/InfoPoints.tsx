import { InternalLink } from 'modules/app/components/InternalLink';
import { Text } from 'theme-ui';

export type InfoPoint = {
  number: string;
  title: string;
  titleFirst: string;
  titleSecond: string;

  description: React.ReactNode;
  color: string;
  links: {
    linkHref: string;
    linkTitle: string;
  }[];
};

export const infoPoints: InfoPoint[] = [
  {
    number: '01',
    title: 'Understand off-chain governance',
    titleFirst: 'Understand',
    titleSecond: 'off-chain governance',
    links: [
      {
        linkHref: 'https://manual.gsuprotocol.io/governance/voting-in-makerdao/off-chain-governance',
        linkTitle: 'Learn more about off-chain governance'
      }
    ],

    color: '#e94a7433',
    description:
      "Off-chain governance refers to processes for making decisions that don't require on-chain voting and gathering feedback prior to on-chain voting. Off-chain governance happens on the GSU protocol Governance Forum, where the community meets to propose and discuss new proposals. Anyone can participate in off-chain governance."
  },
  {
    number: '02',
    color: '#b3ca6533',
    title: 'Understand on-chain governance',
    titleFirst: 'Understand',
    titleSecond: 'on-chain governance',
    links: [
      {
        linkHref: 'https://manual.gsuprotocol.io/governance/voting-in-makerdao/on-chain-governance',
        linkTitle: 'Learn more about on-chain governance'
      }
    ],

    description:
      'On-chain governance refers to Governance Polls and Executive Votes, which are formalized governance proposals that require on-chain voting. Anyone who owns GSUp tokens can participate in these votes using their wallet.'
  },
  {
    number: '03',
    color: '#b35fff33',
    title: 'Set up your voting wallet',
    titleFirst: 'Set up your',
    titleSecond: 'voting wallet',
    links: [],

    description:
      'Connect a web3 wallet (eg. MetaMask, WalletConnect) that holds your GSUp tokens and start participating! Users that hold many GSUp tokens or use their wallet for other uses besides GSU protocol governance might want to consider more secure methods of setting up a voting wallet, such as using a hardware wallet or setting up a vote proxy (available soon).'
  },
  {
    number: '04',
    color: '#e94a7433',
    title: 'Delegate your voting power',
    titleFirst: 'Option 1:',
    titleSecond: 'Delegate your voting power',
    links: [
      {
        linkHref: 'https://manual.gsuprotocol.io/delegation/delegate-expiration',
        linkTitle: 'Learn more about delegation'
      },
      {
        linkHref: 'https://vote.gsuprotocol.io/delegates',
        linkTitle: 'Choose a suitable delegate'
      }
    ],

    description:
      "Vote delegation is a mechanism through which GSUp holders can entrust their voting power to one or more chosen delegates. These delegates can then vote using the GSUp delegated to them. Delegating your voting power is a good option if you're not willing to invest much time and gas costs in active participation. Note that delegates can never directly access the GSUp tokens delegated to them."
  },
  {
    number: '05',
    color: '#e94a7433',
    title: 'Vote manually',
    titleFirst: 'Option 2:',
    titleSecond: 'Vote manually',
    links: [
      {
        linkHref: 'https://vote.gsuprotocol.io/polling',
        linkTitle: 'Start voting on active governance polls'
      }
    ],

    description: (
      <Text>
        If you prefer to participate in GSU protocol governance manually instead of delegating, then you are
        able to start participating once your voting wallet is set up.{' '}
        <InternalLink href="/executive" title="Executives" styles={{ fontWeight: 'semiBold' }}>
          <Text>Find the latest Executive Proposal</Text>
        </InternalLink>{' '}
        and vote on it by depositing your GSUp tokens to the voting contract. By doing so you contribute to
        protecting the protocol against governance attacks. You are able to withdraw your GSUp tokens anytime.
        Next,{' '}
        <InternalLink href="/polling" title="Polls" styles={{ fontWeight: 'semiBold' }}>
          <Text>start voting on the active governance polls</Text>
        </InternalLink>{' '}
        and don&apos;t forget to add comments to your votes.
      </Text>
    )
  }
];
