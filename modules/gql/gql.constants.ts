import { config } from "lib/config";

/* Spock URLs */

export const LOCAL_SPOCK_URL = "http://localhost:3001/v1"
export const GOERLI_SPOCK_URL = "https://polling-db-goerli.gsuprotocol.io/v1"
export const STAGING_MAINNET_SPOCK_URL = "https://polling-db-staging.gsuprotocol.io/v1"
export const MAINNET_SPOCK_URL = "https://polling-db-prod.gsuprotocol.io/v1"

export enum QueryFilterNames {
  Active = 'active',
  PollId = 'pollId',
  Range = 'range',
  MultiHash = 'multiHash'
}
