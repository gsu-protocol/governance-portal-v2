import type { EthSdkConfig } from '@dethcrypto/eth-sdk';
import 'dotenv/config';

declare let process: any;

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      chief: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0',
      chiefOld: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5',
      dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
      // This is an arbitrary spell address that must be changed with each implementation
      dssSpell: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B',
      end: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28',
      esm: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58',
      iou: '0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7',
      iouOld: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355',
      mkr: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
      pause: '0xbe286431454714f511008713973d3b053a2d38f3',
      pauseProxy: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB',
      polling: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133',
      pollingOld: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D',
      pot: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
      vat: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
      voteDelegateFactory: '0xD897F108670903D1d6070fcf818f9db3615AF272',
      voteProxyFactory: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408',
      voteProxyFactoryOld: '0xa63E145309cadaa6A903a19993868Ef7E85058BE',
      vow: '0xA950524441892A31ebddF91d3cEEFa04Bf454466'
    },
    goerli: {
      chief: '0xD4bf8D5BB06Ce0c11fD861786442E06E7370139F',
      dai: '0x252D98faB648203AA33310721bBbDdfA8F1b6587',
      // This is an arbitrary spell address that must be changed with each implementation
      dssSpell: '0xc4BCED0F4f141915dcCE58DbAB2D2DEe88af472B',
      end: '0x5d4402413e6dA232805d210B8615d64b196a7626',
      esm: '0x8bdD5f418E64Ec0D507034C74A892DDF5CA1270a',
      iou: '0x76DE3949Cdc682A03d03D4DD7b2be77830942BD5',

      mkr: '0x66076a3CA93Da5A2E134852C4f2aDd26531b8bB2',
      pause: '0x32aB913942d76fAd846084870192EF2a8A240fD9',
      pauseProxy: '0xB8BB517e8b21852dF484BFac8Ef4C23b1B1BFe4e',
      polling: '0x2F82f408868D0CDe62E6d367Efc285f2a0a1fba9',
      pot: '0x38c0F1e7ECB3A6F73CFd01996cB22C6862923531',
      vat: '0x56BE2C3B452FB58b49fc6c1e74d9ec36317f0E2f',
      voteDelegateFactory: '0xEdcD644f03A54D2113eedfED5159D2B73cb9b434',
      voteProxyFactory: '0xF283dc19A36d22968cFfBDD1F575432e90341392',
      vow: '0x05E591d16cCE895b879820dae080dBe6149E5642'
    }
  },
  etherscanKeys: { mainnet: process.env.ETHERSCAN_KEY || '' }
};

export default config;
