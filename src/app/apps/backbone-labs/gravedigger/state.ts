import { atom } from 'recoil'
import type { AsyncState } from '@/types'

export type BackboneLabsState = AsyncState<{
  gravedigger: {
    exchangeRate: number
    unbondings: Array<{
      amount: number
      start: number
      end: number
    }>
  }
}>

export const backboneLabsAtom = atom<BackboneLabsState>(
  {
    key: 'BackboneLabsState',
    default: {
      state: {
        gravedigger: {
          exchangeRate: 0,
          unbondings: []
        }
      },
      loading: true,
      error: null
    }
  }
)
