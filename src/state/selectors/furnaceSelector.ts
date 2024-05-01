import { type ChainName, ENDPOINTS } from '@/constants'
import { selector, useRecoilValueLoadable, waitForAll } from 'recoil'
import { chainLeaderboardSelector, chainAssetsSelector } from '@/state'
import type { TotalFurnaceData } from '@/hooks'

/**
 * All of the fuel assets and its leaderboard info in a object, keyed by the chain name.
 */
export const furnaceSelector = selector<Record<ChainName, Array<TotalFurnaceData[1]>> | undefined>({
  key: 'furnaceSelector',
  get: ({ get }) => {
    const allFurnace = Object.keys(ENDPOINTS).map((chainName) => {
      const allLeaderboard = get(chainLeaderboardSelector(chainName))
      const allChainAssets = get(chainAssetsSelector(chainName))

      if (allLeaderboard != null && allChainAssets != null) {
        const formattedAllLeaderboard = Object.fromEntries(allLeaderboard)
        return ([chainName,
          allChainAssets.map((asset) => {
            return {
              fuelDenom: asset.burnAsset.id,
              asset,
              leaderboard: formattedAllLeaderboard[asset.burnAsset.id]
            }
          })] as const)
      } return undefined
    })

    return Object.fromEntries(allFurnace.filter(x => !!x))
  }
})
