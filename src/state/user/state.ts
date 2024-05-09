import type { Asset, AsyncState } from '@/types'

export type UserState = AsyncState<{
  assets: Asset[]
}>
