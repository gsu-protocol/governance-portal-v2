import { Flex, Text, useColorMode } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import React from 'react';
import { translate } from '@makerdao/i18n-helper';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { GenericLink } from 'modules/app/components/GenericLink';

const ContactSection = ({ heading, logos, icon }) => {
  return (
    <Flex sx={{ flexDirection: 'column', gap: 2 }}>
      <Text as="h4" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
        {heading}
      </Text>
      <Flex
        sx={{
          alignItems: 'center',
          '& svg': {
            width: 20,
            height: 20,
            transition: 'opacity 0.2s',
            cursor: 'pointer',
            opacity: 0.8,
            marginRight: 24,
            ':hover': {
              opacity: 1
            }
          }
        }}
      >
        {logos.map(({ title, url, icon, styles }) => (
          <ExternalLink key={title} styles={{ color: 'text', ...styles }} href={url} title={title}>
            <Icon name={icon} />
          </ExternalLink>
        ))}
      </Flex>
      <Icon name={icon} size={'130px'} sx={{ my: [0, 0, 4] }} />
    </Flex>
  );
};

export default function Footer({ locale = 'en' }: { locale?: string }): React.ReactElement {
  const bpi = useBreakpointIndex();
  const [mode] = useColorMode();

  const t = text => translate(text, locale);

  const links = [
    {
      header: t('Governance'),
      list: [
        {
          url: 'https://forum.gsuprotocol.io/',
          title: t('Forum')
        },
        {
          url: 'https://manual.gsuprotocol.io/',
          title: t('Operational Manual')
        },
        {
          url: 'https://gsuprotocol.world/en/learn/governance/',
          title: t('Governance FAQs')
        }
        // {
        //   url: 'https://docs.google.com/spreadsheets/d/1LWNlv6hr8oXebk8rvXZBPRVDjN-3OrzI0IgLwBVk0vM/edit#gid=0',
        //   title: t('Gov Tracking Sheet')
        // },
        // {
        //   url: 'https://manual.gsuprotocol.io/governance/governance-cycle/monthly-governance-cycle',
        //   title: t('Monthly Gov Cycle')
        // },
        // {
        //   url: 'https://manual.gsuprotocol.io/governance/governance-cycle/weekly-governance-cycle',
        //   title: t('Weekly Gov Cycle')
        // }
      ]
    },
    {
      header: t('Products & Tools'),
      list: [
        {
          url: 'https://statuspage.gsuprotocol.io/',
          title: t('Service Status')
        },

        {
          url: 'https://unified-auctions.gsuprotocol.io/',
          title: t('Auctions Dashboard')
        },
        // {
        //   url: 'https://migrate.gsuprotocol.io/',
        //   title: t('Migrate Dashboard')
        // },
        // {
        //   url: 'https://makerburn.com/',
        //   title: t('MakerBurn')
        // },
        {
          url: 'https://gsustats.gsuprotocol.io',
          title: t('GSUc Stats')
        },
        {
          url: '/terms',
          title: t('Terms')
        }
      ]
    },
    {
      header: t('Developer'),
      list: [
        {
          url: 'https://www.gsuprotocol.io/_files/ugd/552241_f8b3211df20c463e85d8f292a06944f4.pdf',
          title: t('Whitepaper')
        },
        {
          url: 'https://docs.gsuprotocol.io/',
          title: t('Technical Docs')
        },
        {
          url: '/api-docs',
          title: t('API Docs')
        },
        {
          url: 'https://github.com/gsu-protocol/developerguides',
          title: t('Developer Guides')
        },
        {
          url: 'https://linktr.ee/gsucoin',
          title: t('Brand Assets')
        },
        {
          url: 'https://gsuprotocol.io/en/feeds/',
          title: t('Oracle Feeds')
        }
      ]
    }
  ];

  const logos = {
    makerdao: [
      { title: 'Discord', url: 'https://discord.com/invite/cm3tmM37W3', icon: 'discord' },
      { title: 'Twitter', url: 'https://twitter.com/gsucoin', icon: 'twitter' },
      // { title: 'Reddit', url: 'https://www.reddit.com/r/MakerDAO/', icon: 'reddit' },
      // { title: 'YouTube', url: 'https://www.youtube.com/MakerDAO', icon: 'youtube' },
      { title: 'GitHub', url: 'https://www.github.com/gsu-protocol', icon: 'github' }
    ],
    makerdux: [
      // { title: 'Discord', url: 'https://discord.gg/GHcFMdKden', icon: 'discord' },
      // { title: 'Twitter', url: 'https://twitter.com/MakerDUX', icon: 'twitter' },
      // { title: 'GitHub', url: 'https://github.com/gsu-protocol/governance-portal-v2', icon: 'github' },
      // { title: 'Canny', url: 'https://makergovernance.canny.io/', icon: 'ca      nny' },
      // { title: 'Immunefi', url: 'https://immunefi.com/bounty/makerdao/', icon: 'immunefi' }
    ]
  };

  const mobile = bpi <= 1;
  return (
    <div sx={{ position: 'relative', mt: 4 }}>
      <div
        sx={{
          width: '100vw',
          height: '100%',
          left: '50%',

          zIndex: -1,
          position: 'absolute',
          transform: 'translateX(-50%)',
          backgroundImage:
            mode === 'dark'
              ? bpi <= 2
                ? 'url(/assets/bg_dark_medium.jpeg)'
                : 'url(/assets/bg_footer_dark.jpeg)'
              : bpi <= 2
              ? 'url(/assets/bg_medium.jpeg)'
              : 'url(/assets/bg_footer_light.jpeg)',
          backgroundSize: ['1500px', '1500px', '1500px', '100% 600px', '100% 400px'],
          backgroundRepeat: 'no-repeat',
          backgroundPosition: ['-750px 100%', '-750px 100%', '-750px 100%', 'bottom', 'bottom']
        }}
      />
      <Flex
        as="footer"
        sx={{
          justifyContent: 'space-between',
          gap: 4,
          width: '100%',
          flexDirection: mobile ? 'column' : 'row',
          pt: 4,
          pb: 5
        }}
      >
        <ContactSection heading="Official Community Channels" icon="maker" logos={logos.makerdao} />
        <Flex
          sx={{
            justifyContent: 'space-between',
            gap: [4, 2, 5],
            width: ['100%', '100%', 'initial'],
            flexWrap: ['wrap', 'nowrap']
          }}
        >
          {links.map(group => {
            return (
              <Flex key={group.header} sx={{ flexDirection: 'column', gap: 2, minWidth: ['45%', 'initial'] }}>
                <Text as="h4" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
                  {group.header}
                </Text>
                {group.list.map(({ url, title }) => {
                  return (
                    <GenericLink key={title} href={url} title={title}>
                      <Text>{title}</Text>
                    </GenericLink>
                  );
                })}
              </Flex>
            );
          })}
        </Flex>
        {/* <ContactSection heading="Development & UX Channels" icon="makerdux" logos={logos.makerdux} /> */}
      </Flex>
    </div>
  );
}
