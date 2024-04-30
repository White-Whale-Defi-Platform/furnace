import type { FurnaceQueryClient } from '@/codegen'
import type { ChainName } from '@/constants'
import { atom } from 'recoil'

/**
 * Intends to store clients for each of the chains in the ENDPOINTS constant
 */
export const clientsAtom = atom<Record<ChainName, FurnaceQueryClient> | null>(
  {
    key: 'clientsAtom',
    default: null
  }
)
