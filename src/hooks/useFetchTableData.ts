// import type { Asset } from '@/types'
// import { useFetchLeaderboard, useFetchChainAssets } from './index'

// export interface LeaderboardResults {
//   uniqueBurners: number
//   totalBurnedAssets: number
//   avgTokensBurnedPerUniques: number
//   leaderboard: Array<[userAddress: string, tokensBurned: number]>
// }

// export const useFetchTableData = (chainName: string): Record<string, Array<{ asset: Asset, burned: number, uniques: number }>> => {
//   const fetchChainAsset = useFetchChainAssets(chainName)
//   const fuelDenom = (fetchChainAsset.data != null) ? fetchChainAsset.data.map((asset) => asset.id) : []
//   const fetchTableData = useFetchLeaderboard(chainName, fuelDenom[0]).data

//   return ({
//     [chainName]: (fetchChainAsset.data != null && fetchTableData != null)
//       ? fetchChainAsset.data.map((asset) => ({
//         asset,
//         burned: fetchTableData.totalBurnedAssets / Math.pow(10, asset.decimals),
//         uniques: fetchTableData.uniqueBurners
//       }))
//       : []
//   })
// }
