import { type ChainAsset, fetchChainAssetsWithMintDenom } from '@/hooks'
import {
  type RecoilValueReadOnly,
  selector,
  selectorFamily,
  waitForAll,
} from 'recoil'
import { ENDPOINTS, type ChainName } from '@/constants'
import { balanceSelector, clientsAtom } from '@/state'
import { coin } from '@cosmjs/stargate'
import { findRegistryAssetBySymbol, updateAssetAmount } from '@/util'
import { dynamicAssetsSelector } from './dynamicAssetsSelector'

/**
 * Returns all the chain assets for a single chain.
 */
export const chainAssetsSelector = selectorFamily<
Array<{ burnAsset: ChainAsset, mintAsset: ChainAsset }>,
ChainName
>({
  key: 'chainAssetsSelector',
  get:
    (chainName: string) =>
      async ({ get }) => {
        const clients = get(clientsAtom)

        // const client = clients[chainName]

        // if (typeof client === 'undefined') {
        //   return await Promise.reject('No client found for ' + chainName)
        // }
        const assets = await fetchChainAssetsWithMintDenom(chainName, clients[chainName], 50)
        if (
          assets.some(
            ({ burnAsset, mintAsset }) =>
              !(burnAsset.inChainRegistry && mintAsset.inChainRegistry)
          )
        ) {
        // get the chainRegistryAssetList selector
          const crAssets = get(dynamicAssetsSelector).getChainAssetList(
            chainName
          ).assets

          // map over all the items and utilize the crAssets dynamic fetcher for any assets that were not in the registry
          return assets.flatMap(({ burnAsset, mintAsset }) => {
            if (!(burnAsset.inChainRegistry && mintAsset.inChainRegistry)) {
              const newBurnAsset = findRegistryAssetBySymbol(
                chainName,
                burnAsset.name,
                crAssets
              )
              const newMintAsset = findRegistryAssetBySymbol(
                chainName,
                mintAsset.name,
                crAssets
              )
              return [{
                burnAsset:
                newBurnAsset != null
                  ? { ...newBurnAsset, inChainRegistry: true }
                  : burnAsset,
                mintAsset:
                newMintAsset != null
                  ? { ...newMintAsset, inChainRegistry: true }
                  : mintAsset,
              }]
            }
            return assets
          })
        }
        return assets
      },
})

/**
 * Returns the single pair of the chain asset and its balance. This selector can be used in a burning page.
 */
export const assetPairWithBalanceSelector = selectorFamily<
{ burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined,
{ chainName: ChainName, burnAssetName: string, address: string | undefined }
>({
  key: 'assetPairWithBalanceSelector',
  get:
    ({ chainName, burnAssetName, address }) =>
      ({ get }) => {
        const pair = get(
          assetPairSelector({ chainName, burnAssetName })
        )
        if (pair != null) {
          const { burnAsset, mintAsset } = pair
          const burnBalance = get(
            balanceSelector({ chainName, address, denom: burnAsset.id })
          )
          const mintBalance = get(
            balanceSelector({ chainName, address, denom: mintAsset.id })
          )
          return {
            burnAsset: updateAssetAmount(
              burnAsset,
              burnBalance ?? coin(0, burnAsset.id)
            ),
            mintAsset: updateAssetAmount(
              mintAsset,
              mintBalance ?? coin(0, mintAsset.id)
            ),
          }
        }
        else {
          return undefined
        }
      },
})

/**
 * Returns the pair of burn and mint denoms when they exist.
 */
const assetPairSelector = selectorFamily<
{ burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined,
{ chainName: ChainName, burnAssetName: string }
>({
  key: 'assetPairSelector',
  get:
    ({ chainName, burnAssetName }) =>
      ({ get }) => {
        const allChainAssets = get(chainAssetsSelector(chainName))
        return allChainAssets.find(({ burnAsset: { name } }) => {
          return name.toLowerCase() === burnAssetName.toLowerCase()
        // const foundAssets = allChainAssets.find(({ burnAsset: { name } }) => {
        //   return name.toLowerCase() === burnAssetName.toLowerCase()
        // })
        // return await (foundAssets || Promise.reject(Error(`No assets exist ${chainName + burnAssetName}`)))
        })
      },
})

/**
 * All the chain assets for every chains that are available from the furnaces
 * Keyed by chain name and set of burn and mint denom pairs
 */
export const allChainAssetsSelector = selector<
Record<ChainName, Array<{ burnAsset: ChainAsset, mintAsset: ChainAsset }>>
>({
  key: 'allChainAssetsSelector',
  get: ({ get }) => {
    const allChains = Object.keys(ENDPOINTS).map(
      (
        chainName
      ): [
        chainName: ChainName,
        assetSelector: RecoilValueReadOnly<
        Array<{
          burnAsset: ChainAsset
          mintAsset: ChainAsset
        }>
        >,
      ] => {
        return [chainName, chainAssetsSelector(chainName)]
      }
    )
    // Wait until the allChains gets loaded
    return get(waitForAll(Object.fromEntries(allChains)))
  },
})
