import type { FurnaceQueryClient, FuelConfig } from '@/codegen'
import { assets } from 'chain-registry'
import type { Asset as CRAsset } from '@chain-registry/types'
import {
  type UseQueryResult,
  useQuery,
  useQueries
} from '@tanstack/react-query'
import type { Asset } from '@/types/app'
import { crAssetConvert, fcAssetConvert, fetchChainRegistryAsset } from '@/util/asset'
import { ENDPOINTS } from '@/constants'

export type ChainAsset = Asset & { inChainRegistry: boolean }

/**
 * Gets the list of every fuel config for the contract that the clients is connected to
 * @param client The client for interacting with a furnace contract
 * @param limit The max number of fuel configs to fetch in each set of paginated data
 * @param startAfter The address to base the next set of paginated data off
 * @returns All of the fuel configs
 */
export const fetchFuelConfigs = async (
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
            ...(await fetchFuelConfigs(client, limit, fuels.at(-1)?.denom))
          ]
    )

/**
 * Fetches all of the fuel configs and converts them into internal app assets that contains mint assets
 * @param chainName The name of the chain that the assets should have definitions on
 * @param client The client for interacting with a furnace contract
 * @param limit The max number of fuel configs to fetch in each set of paginated data
 * @returns All of the `Asset`s (inlcuding mint assets) that exist as fuels on the chain's furnace
 */
export const fetchChainAssetsWithMintDenom = async (
  chainName: string,
  client: FurnaceQueryClient,
  limit: number
): Promise<Array<{ burnAsset: ChainAsset, mintAsset: ChainAsset }>> => {
  // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
  const crAssets = fetchChainRegistryAsset(chainName) ?? []
  return await fetchFuelConfigs(client, limit)
    .then(
      (fuels) =>
        fuels.map(
          (fuel) => {
            const asset = (crAssets.find(({ base }) => base === fuel.denom) ?? fuel)

            // get the chain asset for the burn asset to use throughout the application
            const burnAsset: ChainAsset = 'subdenom' in asset
              ? { ...fcAssetConvert(asset), inChainRegistry: false }
              : { ...crAssetConvert(asset), inChainRegistry: true }

            // since we have the fuel subdenom we can know the mint denom's name
            const expectedMintDenom = `factory/${ENDPOINTS[chainName].contractAddress}/${fuel.subdenom}.ash`
            // lastly look for the mint denom in the registry and convert it to a chain asset just like we did with the burn asset
            const mintRegistryAsset = crAssets.find(({ base }) => base === expectedMintDenom)
            return ({
              burnAsset,
              mintAsset: (mintRegistryAsset != null)
                ? crAssetConvert(mintRegistryAsset)
                : fcAssetConvert({ denom: expectedMintDenom, subdenom: `ash${burnAsset.name}` })
            })
          })
    )
}

// /**
//  * Fetches all of the fuel configs and converts them into internal app assets
//  * @param chainName The name of the chain that the assets should have definitions on
//  * @param client The client for interacting with a furnace contract
//  * @param limit The max number of fuel configs to fetch in each set of paginated data
//  * @returns All of the `Asset`s that exist as fuels on the chain's furnace
//  */
// export const fetchChainAssets = async (
//   chainName: string,
//   client: FurnaceQueryClient,
//   limit: number
// ): Promise<ChainAsset[]> => {
//   // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
//   const crAssets =
//     assets.find(
//       ({ chain_name: ChainAssetName }) => ChainAssetName === chainName
//     )?.assets ?? []
//   return await fetchFuelConfigs(client, limit)
//     .then(
//       (fuels): Array<CRAsset | FuelConfig> =>
//         fuels.map(
//           (fuel): CRAsset | FuelConfig =>
//             crAssets.find(({ base }) => base === fuel.denom) ?? fuel
//         )
//     )
//     .then((chainAssetList) =>
//       chainAssetList.map((asset) =>
//         'subdenom' in asset
//           ? { ...fcAssetConvert(asset), inChainRegistry: false }
//           : { ...crAssetConvert(asset), inChainRegistry: true }
//       )
//     )
// }
