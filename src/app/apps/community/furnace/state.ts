import { atom } from 'recoil'
import type { AsyncState } from '@/types'

export type FurnaceState = AsyncState<{
  leaderboard: Array<[string, string]>
}>

export const furnaceAtom = atom<FurnaceState>(
  {
    key: 'FurnaceState',
    default: {
      state: {
        leaderboard: []
      },
      loading: true,
      error: null
    }
  }
)
