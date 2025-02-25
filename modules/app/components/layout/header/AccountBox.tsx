import { useState } from 'react';
import { Flex, Text, Box, Button, Link as ExternalLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { formatAddress } from 'lib/utils';
import { useWeb3 } from 'modules/web3/hooks/useWeb3';
import AddressIcon from 'modules/address/components/AddressIcon';
import { getEtherscanLink } from 'modules/web3/helpers/getEtherscanLink';
import { WalletName } from 'modules/web3/constants/wallets';
import { InternalLink } from 'modules/app/components/InternalLink';

type Props = {
  address: string;
  accountName?: WalletName;
  change: () => void;
  disconnect: () => void;
};

const AccountBox = ({ address, accountName, change, disconnect }: Props): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const { network } = useWeb3();

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Flex>
          <Icon name="MetaMask" size={'24px'} />
          <Text variant="secondary" sx={{ ml: 2 }}>
            Connected with {accountName}
          </Text>
        </Flex>
        <Button variant="mutedOutline" onClick={change}>
          Change
        </Button>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Flex sx={{ alignItems: 'center', flexDirection: 'row', mt: 1 }}>
          <Box sx={{ mr: 2 }}>
            <AddressIcon address={address} width={22} />
          </Box>
          <Text data-testid="current-wallet" sx={{ fontWeight: 500 }}>
            {formatAddress(address).toLowerCase()}
          </Text>
        </Flex>
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          }}
          data-testid="copy-address"
        >
          <Text variant="secondary">{copied ? 'Copied!' : 'Copy Address'}</Text>
          <Icon name="copy" color="textSecondary" sx={{ ml: 2 }} size="14px" />
        </Flex>
      </Flex>
      <Flex
        sx={{
          mt: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ExternalLink href={getEtherscanLink(network, address, 'address')} target="_blank">
          View on Etherscan
          <Icon name="arrowTopRight" size={2} sx={{ ml: 1 }} />
        </ExternalLink>
        <Button variant="mutedOutline" onClick={disconnect}>
          Disconnect
        </Button>
      </Flex>
      <Flex sx={{ mt: 3, justifyContent: 'center' }}>
        <InternalLink
          href={'/account'}
          title="View account page"
          styles={{ color: 'accentBlue', width: '100%' }}
        >
          <Button variant="primaryOutline" sx={{ width: '100%' }}>
            View account page
          </Button>
        </InternalLink>
      </Flex>
    </Flex>
  );
};

export default AccountBox;
