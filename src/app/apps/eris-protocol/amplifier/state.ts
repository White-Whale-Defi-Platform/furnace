import { atom } from 'recoil'
import type { AsyncState } from '@/types'

export const erisProtocolAtom = atom<ErisProtocolState>(
  {
    key: 'ErisProtocolState',
    default: {
      state: {
        amplifier: {
          exchangeRate: 0,
          unbondings: []
        }
      },
      loading: true,
      error: null
    }
  }
)

export type ErisProtocolState = AsyncState<{
  amplifier: {
    exchangeRate: number
    unbondings: Array<{
      amount: number
      start: number
      end: number
    }>
  }
}>
