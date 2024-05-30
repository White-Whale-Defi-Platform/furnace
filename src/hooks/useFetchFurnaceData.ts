import { type ChainAsset } from '@/hooks'
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
    asset: { burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined
    leaderboard: LeaderboardResults
  }
]
