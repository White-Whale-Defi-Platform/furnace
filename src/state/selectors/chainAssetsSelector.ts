import { type ChainAsset, fetchChainAssetsWithMintDenom } from '@/hooks'
import {
  type RecoilValueReadOnly,
  selector,
  selectorFamily,
  waitForAll
} from 'recoil'
import { ENDPOINTS, type ChainName } from '@/constants'
import { balanceSelector, clientsAtom } from '@/state'
import { type Coin, coin } from '@cosmjs/stargate'
import type { Asset } from '@/types'
import { updateAssetAmount } from '@/util'

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
        return await fetchChainAssetsWithMintDenom(
          chainName,
          clients[chainName],
          50
        )
      }
})

/**
 * Returns the single pair of the chain asset and its balance. This selecotr can be used in a burning page.
 */
export const assetPairWithBalanceSelector = selectorFamily<
{ burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined,
{ chainName: ChainName, burnDenomName: string, address: string | undefined }
>({
  key: 'assetPairWithBalanceSelector',
  get:
    ({ chainName, burnDenomName, address }) =>
      ({ get }) => {
        const pair = get(assetPairSelector({ chainName, burnDenomName }))
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
            )
          }
        } else {
          return undefined
        }
      }
})

/**
 * Returns the pair of burn and mint denoms when they exist.
 */
export const assetPairSelector = selectorFamily<
{ burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined,
{ chainName: ChainName, burnDenomName: string }
>({
  key: 'assetPairSelector',
  get:
    ({ chainName, burnDenomName }) =>
      ({ get }) => {
        const allChainAssets = get(chainAssetsSelector(chainName))
        return allChainAssets.find(({ burnAsset: { name } }) => {
          return name.toLowerCase() === burnDenomName.toLowerCase()
        })
      }
})

/**
 * All the chain assets for every chains that are available from the furnaces
 * Keyed by chain name and set of burn and mint denom pairs
 */
export const allChainAssetsSelector = selector<Record<ChainName, Array<{ burnAsset: ChainAsset, mintAsset: ChainAsset }>>>(
  {
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
          >
        ] => {
          return [chainName, chainAssetsSelector(chainName)]
        }
      )
      // Wait until the allChains gets loaded
      return get(waitForAll(Object.fromEntries(allChains)))
    }
  }
)
