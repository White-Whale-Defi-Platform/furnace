import { useFetchChainAssets } from './useFetchChainAssets'
import { useFetchLeaderboard } from './useFetchLeaderboard'

export const useFetchTableData = (chainName: string) => {
  const fetchChainAsset = useFetchChainAssets(chainName)

  const fuelDenom = (fetchChainAsset.data != null) ? fetchChainAsset.data.map((asset) => asset.id) : []
  const fetchTableData = useFetchLeaderboard(chainName, fuelDenom[0]).data

  return fetchTableData
}
