import {
  type LeaderboardInfo,
  fetchLeaderboard
} from '@/hooks'
import { selector, selectorFamily, waitForAll } from 'recoil'
import { clientsAtom, chainAssetsSelector } from '@/state'
import { ENDPOINTS, type ChainName } from '@/constants'

export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

/**
 * The leaderboard for a single fule denom.
 */
export const leaderboardSelector = selectorFamily<
LeaderboardResults,
{ chainName: ChainName, denom: string }
>({
  key: 'leaderboardSelector',
  get:
    ({ chainName, denom }) =>
      async ({ get }) => {
        const client = get(clientsAtom)[chainName]
        return await fetchLeaderboard(client, denom, 30)
      }
})

/**
 * All the leaderboards for an entire chain.
 */
export const chainLeaderboardSelector = selectorFamily<
LeaderboardInfo[],
ChainName
>({
  key: 'chainLeaderboardSelector',
  get:
    (chainName) =>
      async ({ get }) => {
        const client = get(clientsAtom)[chainName]
        const chainAssets = get(chainAssetsSelector(chainName))

        return await Promise.all(
          chainAssets.map(
            async ({ burnAsset: { id } }): Promise<LeaderboardInfo> => [
              id,
              await fetchLeaderboard(client, id, 30)
            ]
          )
        )
      }
})

/**
 * All the leaderboards for the every chains that are available from the furnaces.
 */
export const allChainLeaderboardsSelector = selector<
Record<ChainName, LeaderboardInfo[]>
>({
  key: 'allChainLeaderboardsSelector',
  get: ({ get }) => {
    const allChains = Object.keys(ENDPOINTS).map((chainName) => {
      return [chainName, chainLeaderboardSelector(chainName)] as const
    })
    return get(waitForAll(Object.fromEntries(allChains)))
  }
})
