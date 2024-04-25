import {
  useFetchAllChainAssets,
  useFetchAllLeaderboard,
  type ChainAsset
} from '@/hooks'

export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

export type TotalFurnaceData = [
  chainName: string,
  assetInfo: {
    fuelDenom: string
    asset: ChainAsset | undefined
    leaderboard: LeaderboardResults
  }
]

/**
 * Fetches all of the fuel leaderboard and assets combined to make the data more accessible else where.
 * @returns All of the fuel assets and its leaderboard info in a tuple, first index of tuple by the chain name.
 */
export const useFetchFurnaceData = (): TotalFurnaceData[] => {
  const allChainAssets = useFetchAllChainAssets()
  const allLeaderboard = useFetchAllLeaderboard()

  // Put the assets in an object keyed by their base denom- this will make it easy for us to find the correct asset definition later
  const assetsByDenom = Object.fromEntries(
    allChainAssets
      .flatMap(({ data }) => (data != null ? [data] : []))
      .flatMap(([_, assetInfos]) =>
        assetInfos.map((asset) => [asset.id, asset])
      )
  )

  // Go through all the leaderboards and pair them with the fetched asset definitions
  return Object.entries(allLeaderboard.data).flatMap(
    ([chainName, leaderboardResults]) =>
      leaderboardResults.map(
        ([fuelDenom, leaderboard]): TotalFurnaceData => [
          chainName,
          {
            fuelDenom,
            asset: assetsByDenom[fuelDenom],
            leaderboard
          }
        ]
      )
  )
}
