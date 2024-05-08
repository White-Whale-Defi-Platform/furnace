import { selectorFamily } from 'recoil'
import { clientsAtom } from '../atoms'
import type { ChainName } from '@/constants'
import type { Coin } from '@cosmjs/stargate'

/**
 * Returns the users denom balance
 */
export const balanceSelector = selectorFamily<Coin | undefined, { chainName: ChainName, address: string | undefined, denom: string }>({
  key: 'balanceSelector',
  get: ({ chainName, denom, address }) => async ({ get }) => {
    const { client } = get(clientsAtom)[chainName]
    return (address != null) ? await client.getBalance(address, denom) : undefined
  }
})
