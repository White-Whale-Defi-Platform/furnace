import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import type { FurnaceQueryClient, FuelConfig } from '@/codegen'
import { assets } from 'chain-registry'
import type { Asset as CRAsset } from '@chain-registry/types'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { Asset } from '@/types/app'
import { crAssetConvert, fcAssetConvert } from '@/util/asset'

export type ChainAsset = Asset & { inChainRegistry: boolean }

export const fetchChainAssets = async (
  client: FurnaceQueryClient,
  limit: number,
  startAfter?: string
): Promise<FuelConfig[]> =>
  await client
    .fuels({ limit, startAfter })
    // paginate the list of fuel assets with recursion
    .then(async ({ fuels }) =>
      fuels.length < limit
        ? fuels
        : [
            ...fuels,
            ...(await fetchChainAssets(client, limit, fuels.at(-1)?.denom))
          ]
    )

export const useFetchChainAssets = (
  chainName: string
): UseQueryResult<ChainAsset[]> => {
  // requesting the client to interact with blockchain in future
  const { result: client } = useSigningCosmWasmClient(chainName)
  return useQuery({
    queryKey: ['chainAssets', chainName],
    queryFn: async () => {
      // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
      const crAssets =
        assets.find(
          ({ chain_name: ChainAssetName }) => ChainAssetName === chainName
        )?.assets ?? []

      return client != null
      // Call the fetchChainAssets function to grab all of the chain assets from the contract
        ? await fetchChainAssets(client, 30)
          // Iterate the list of fuels from the contract to see if the denom exist in the chain registry, if not returns undefined
          .then(
            (fuels): Array<CRAsset | FuelConfig> =>
              fuels.map(
                (fuel): CRAsset | FuelConfig =>
                  crAssets.find(({ base }) => base === fuel.denom) ?? fuel
              )
          )
          .then((chainAssetList) =>
            chainAssetList.map((asset) =>
              'subdenom' in asset
                ? { ...fcAssetConvert(asset), inChainRegistry: false }
                : { ...crAssetConvert(asset), inChainRegistry: true }
            )
          )
        : undefined
    },
    enabled: client != null
  })
}
