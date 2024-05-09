import { fetchJson } from '@/util'
import type { Coin } from '@cosmjs/stargate'

export interface BalancesResponse {
  balances: Coin[]
}

export const fetchBalances = async (endpoint: string, address: string): Promise<BalancesResponse> => await fetchJson(`${endpoint}/cosmos/bank/v1beta1/balances/${address}`)
