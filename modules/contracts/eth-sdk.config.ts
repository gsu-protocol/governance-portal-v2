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
      chief: '0xB119ee188aF24b78f30f2A42280f94f73d2Bdcb5',
      dai: '0x3d28002C3A50Ed29a41DcE3aE82301C2425a0DF9',
      // This is an arbitrary spell address that must be changed with each implementation
      dssSpell: '0xc4BCED0F4f141915dcCE58DbAB2D2DEe88af472B',
      end: '0xf4BAD4236E55EFCB2fF6555Edd1D4E2662f5a17E',
      esm: '0xaeecfF82e82765b0e24B9CE189FfdD073843b8f1',
      iou: '0x249d2158c3Fc358F64429f540aEfE3a60A865C6A',

      mkr: '0xc4Ea8cE98436B58cc51F7D2d501e27dbbA0066f2',
      pause: '0x4651C1Da28B1a3D806612D1a9F4C00EbD4Ac548a',
      pauseProxy: '0x60aD5Cf2a2DE47b1FD9717A6212E3f6375832195',
      polling: '0x9C2BF9875E41523139cfEC07e35Ef5Be2c3942c3',
      pot: '0x8Cb5765d40cDE60387B43D06D79121B86aE59566',
      vat: '0x7059BD0F529535688ee69c490848508732fCCE07',
      voteDelegateFactory: '0xa0651aCaA384ec105B91FEc3e2aa21021bac8120',
      voteProxyFactory: '0x2c6a8bC9F03DeE6200E29c99a8678585370a2c92',
      vow: '0x140070A6246b4F6321f9C3349b27EA00EC2A391B'
    }
  },
  etherscanKeys: { mainnet: process.env.ETHERSCAN_KEY || '' }
};

export default config;
