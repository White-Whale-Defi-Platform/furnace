import type { FurnaceQueryClient } from '@/codegen'
import type { ChainName } from '@/constants'
import { atom, RecoilLoadable } from 'recoil'

/**
 * Intends to store clients for each of the chains in the ENDPOINTS constant
 */
export const clientsAtom = atom<Record<ChainName, FurnaceQueryClient | undefined>>(
  {
    key: 'clientsAtom',
    default: RecoilLoadable.loading()
  }
)