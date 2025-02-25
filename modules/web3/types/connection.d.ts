import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { ConnectionType } from '../connections';

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}
