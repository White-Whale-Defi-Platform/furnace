import { atom } from 'recoil'
import type { AppState } from './state'

// Todo: Comment
export const appAtom = atom<AppState>(
  {
    key: 'appAtom',
    default: {
      state: {
        height: 0
      },
      loading: true,
      error: null
    }
  }
)
