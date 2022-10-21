import { Box, Heading, Card, Link as ExternalLink, Flex, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

type ResourceType = 'general' | 'polling' | 'executive' | 'delegates';

type ResourceLink = {
  linkTitle: string;
  url: string;
};

type Resource = {
  boxTitle: string;
  links: ResourceLink[];
};

const resources: Record<ResourceType, Resource> = {
  general: {
    boxTitle: 'General Governance Resources',
    links: [
      { linkTitle: 'GSU protocol Forum', url: 'https://forum.gsuprotocol.io/' },
      { linkTitle: 'Governance FAQs', url: 'https://gsuprotocol.world/learn/governance/governance-faq/' },
      {
        linkTitle: 'Governance Risk Framework',
        url: 'https://blog.gsuprotocol.io/makerdao-governance-risk-framework/'
      },
      { linkTitle: 'Awesome GSU protocol', url: 'https://github.com/gsu-protocol/awesome-makerdao/' },
      {
        linkTitle: 'Governance Call Schedule',
        url: 'https://gsuprotocol.world/resources/governance_and_risk_meetings/'
      }
    ]
  },
  polling: {
    boxTitle: 'Polling FAQs',
    links: [
      {
        linkTitle: 'How to participate in GSU protocol governance?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works/'
      },
      {
        linkTitle: 'What are Governance Polls?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works#governance-polls'
      },
      {
        linkTitle: 'How is voting weight calculated?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works#governance-polls-and-executive-votes'
      },
      {
        linkTitle: 'How to set up your wallet for voting?',
        url: 'https://gsuprotocol.world/en/learn/governance/voting-setup/'
      }
    ]
  },
  executive: {
    boxTitle: 'Executive Proposal FAQs',
    links: [
      {
        linkTitle: 'How to participate in GSU protocol governance?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works/'
      },
      {
        linkTitle: 'What are Executive Votes?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works#executive-votes'
      },
      {
        linkTitle: 'How to manually verify Executive Spells',
        url: 'https://gsuprotocol.world/en/learn/governance/audit-exec-spells'
      },
      {
        linkTitle: 'How is voting weight calculated?',
        url: 'https://gsuprotocol.world/en/learn/governance/how-voting-works#governance-polls-and-executive-votes'
      },
      {
        linkTitle: 'How to set up your wallet for voting?',
        url: 'https://gsuprotocol.world/en/learn/governance/voting-setup/'
      }
    ]
  },
  delegates: {
    boxTitle: 'Delegation FAQs',
    links: [
      {
        linkTitle: 'What is vote delegation and how does it work in GSU protocol?',
        url: 'https://forum.gsuprotocol.io/t/delegation-and-makerdao/9429'
      },
      {
        linkTitle: 'What are the requirements for becoming a recognized delegate?',
        url: 'https://forum.gsuprotocol.io/t/recognised-delegate-requirements/9421'
      },
      {
        linkTitle: "The GSUp holder's guide to delegation",
        url: 'https://forum.gsuprotocol.io/t/mkr-holder-s-guide-to-delegation/9602'
      },
      {
        linkTitle: "GSUp token holder's delegation agreement",
        url: 'https://forum.gsuprotocol.io/t/token-holders-delegation-agreement/9385'
      },
      {
        linkTitle: 'Recognized delegate code of conduct',
        url: 'https://forum.gsuprotocol.io/t/recognised-delegate-code-of-conduct/9384'
      }
    ]
  }
};

export default function ResourceBox({
  type,
  className
}: {
  type: ResourceType;
  className?: string;
}): JSX.Element {
  return (
    <Box className={className}>
      <Heading mt={3} mb={2} as="h3" variant="microHeading">
        {resources[type].boxTitle}
      </Heading>
      <Card variant="compact">
        {resources[type].links.map(resource => (
          <Flex key={resource.linkTitle} sx={{ alignItems: 'center', ':not(:last-of-type)': { mb: 3 } }}>
            <ExternalLink href={resource.url} target="_blank">
              <Text sx={{ color: 'accentBlue', ':hover': { color: 'accentBlueEmphasis' } }}>
                {resource.linkTitle}
                <Icon ml={2} name="arrowTopRight" size={2} />
              </Text>
            </ExternalLink>
          </Flex>
        ))}
      </Card>
    </Box>
  );
}
