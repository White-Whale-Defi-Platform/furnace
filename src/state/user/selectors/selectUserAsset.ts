import { userAtom } from '@/state'
import { selectAssetByName } from '@/util'
import { selectorFamily } from 'recoil'

export const selectUserAsset = selectorFamily({
  key: 'selectUserAsset',
  get: (name: string) => ({ get }) => get(userAtom).state.assets.find(asset => asset.name === name) ?? selectAssetByName(name)
})
