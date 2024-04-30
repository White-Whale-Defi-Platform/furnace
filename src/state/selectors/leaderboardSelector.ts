import { type LeaderboardInfo, fetchLeaderboard, type LeaderboardResults } from '@/hooks'
import { selectorFamily } from 'recoil'
import { clientsAtom } from '../atoms/clientsAtom'
import { fuelsSelector } from './fuelsSelector'
import type { ChainName } from '@/constants'

/**
 * The leaderboard for a single asset.
 */
export const leaderboardSelector = selectorFamily<LeaderboardResults | undefined, { chainName: ChainName, denom: string }>({
  key: 'leaderboardSelector',
  get: ({ chainName, denom }) => async ({ get }) => {
    const client = get(clientsAtom)?.[chainName]
    return client != null
      ? await fetchLeaderboard(client, denom, 50)
      : undefined
  }
})

/**
 * All the leaderboards for the entire chain.
 */
export const chainLeaderboardSelector = selectorFamily<LeaderboardInfo[] | undefined, ChainName>({
  key: 'chainLeaderboardSelector',
  get: (chainName) => async ({ get }) => {
    const client = get(clientsAtom)?.[chainName]
    const chainAssets = get(fuelsSelector(chainName))

    return client != null && chainAssets != null
      ? await Promise.all(chainAssets.map(async ({ id }): Promise<LeaderboardInfo> => [id, await fetchLeaderboard(client, id, 50)]))
      : undefined
  }
})
