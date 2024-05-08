import {
  useAllChainCosmWasmClientsReactquery,
  useSigningClient
} from './useSigningCosmWasmClient'
import type { FurnaceQueryClient, FuelConfig } from '@/codegen'
import { assets } from 'chain-registry'
import type { Asset as CRAsset } from '@chain-registry/types'
import {
  type UseQueryResult,
  useQuery,
  useQueries
} from '@tanstack/react-query'
import type { Asset } from '@/types/app'
import { crAssetConvert, fcAssetConvert } from '@/util/asset'
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
  const crAssets =
    assets.find(
      ({ chain_name: ChainAssetName }) => ChainAssetName === chainName
    )?.assets ?? []

  return await fetchFuelConfigs(client, limit)
    .then(
      (fuels) =>
        fuels.map(
          (fuel) =>
            {
              const asset = (crAssets.find(({ base }) => base === fuel.denom) ?? fuel)

              // get the chain asset for the burn asset to use throughout the application
              const burnAsset: ChainAsset =  'subdenom' in asset
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

/**
 * Fetches all of the fuel configs and converts them into internal app assets
 * @param chainName The name of the chain that the assets should have definitions on
 * @param client The client for interacting with a furnace contract
 * @param limit The max number of fuel configs to fetch in each set of paginated data
 * @returns All of the `Asset`s that exist as fuels on the chain's furnace
 */
export const fetchChainAssets = async (
  chainName: string,
  client: FurnaceQueryClient,
  limit: number
): Promise<ChainAsset[]> => {
  // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
  const crAssets =
    assets.find(
      ({ chain_name: ChainAssetName }) => ChainAssetName === chainName
    )?.assets ?? []

  return await fetchFuelConfigs(client, limit)
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
}

/**
 * Gets the all of the fuel assets in a single chain/furnace
 * @param chainName That we're querying
 * @returns List of assets that are fuels in the furnace
 */
export const useFetchChainAssets = (
  chainName: string
): UseQueryResult<ChainAsset[]> => {
  // requesting the client to interact with blockchain in future
  const { result: client } = useSigningClient(chainName)

  return useQuery({
    queryKey: ['chainAssets', chainName, client],
    queryFn: async () =>
      client != null
        ? await fetchChainAssets(chainName, client, 30)
        : undefined,
    enabled: client != null
  })
}

/**
 * Gets all the chain assets from every chains
 * @returns All of the chain and fuel asset infos
 */
export const useFetchAllChainAssets = (): Array<
UseQueryResult<[chainName: string, assets: ChainAsset[]]>
> => {
  const chainNames = Object.keys(ENDPOINTS)
  const { data: clients } = useAllChainCosmWasmClientsReactquery()

  return useQueries({
    queries: chainNames.map((chainName) => ({
      queryKey: ['chainAssets', chainName, clients[chainName]],
      queryFn: async () => {
        const client = clients[chainName]
        return typeof client !== 'undefined'
          ? await fetchChainAssets(chainName, client, 30).then(
            (chainAssets): [chainName: string, assets: ChainAsset[]] => [
              chainName,
              chainAssets
            ]
          )
          : undefined
      },
      enabled: clients[chainName] != null
    }))
  })
}
