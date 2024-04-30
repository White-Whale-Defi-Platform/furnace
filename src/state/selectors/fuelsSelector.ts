import { type ChainAsset, fetchChainAssets } from '@/hooks'
import { selectorFamily } from 'recoil'
import { clientsAtom } from '../atoms/clientsAtom'
import type { ChainName } from '@/constants'

export const fuelsSelector = selectorFamily<ChainAsset[] | undefined, ChainName>({
  key: 'fuelsSelector',
  get: (chainName) => async ({ get }) => {
    const client = get(clientsAtom)?.[chainName]
    return client != null ? await fetchChainAssets(chainName, client, 50) : undefined
  }
})
