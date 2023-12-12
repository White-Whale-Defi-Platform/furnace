import type { Asset, AsyncState } from '@/types'

// Todo: Comment
export type UserState = AsyncState<{
  assets: Asset[]
}>
