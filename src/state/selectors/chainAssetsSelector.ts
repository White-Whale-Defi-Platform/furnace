import { type ChainAsset, fetchChainAssetsWithMintDenom } from '@/hooks'
import { type RecoilValueReadOnly, selector, selectorFamily, waitForAll } from 'recoil'
import { ENDPOINTS, type ChainName } from '@/constants'
import { clientsAtom } from '@/state'

/**
 * Returns all the chain assets for a single chain.
 */
export const chainAssetsSelector = selectorFamily<Array<{ burnAsset: ChainAsset, mintAsset: ChainAsset }>, ChainName>({
  key: 'chainAssetsSelector',
  get: (chainName: string) => async ({ get }) => {
    const clients = get(clientsAtom)
    return await fetchChainAssetsWithMintDenom(chainName, clients[chainName], 50)
  }
})

/**
 * Returns the pair of burn and mint denoms when they exist.
 */
export const assetPairSelector = selectorFamily<{ burnAsset: ChainAsset, mintAsset: ChainAsset } | undefined, { chainName: ChainName, burnDenomName: string }>({
  key: 'assetPairSelector',
  get: ({ chainName, burnDenomName }) => ({ get }) => {
    const allChainAssets = get(chainAssetsSelector(chainName))
    return allChainAssets.find(({ burnAsset: { name } }) => {
      return name.toLowerCase() === burnDenomName.toLowerCase()
    })
  }
})

/**
 * All the chain assets for every chains that are available from the furnaces
 */
export const allChainAssetsSelector = selector<Record<ChainName, ChainAsset[]>>({
  key: 'allChainAssetsSelector',
  get: ({ get }) => {
    const allChains = Object.keys(ENDPOINTS).map((chainName): [chainName: ChainName, assetSelector: RecoilValueReadOnly<Array<{
      burnAsset: ChainAsset
      mintAsset: ChainAsset
    }>> ] => {
      return [chainName, chainAssetsSelector(chainName)]
    })
    // Wait until the allChains gets loaded
    return get(waitForAll(Object.fromEntries(allChains)))
  }
})
