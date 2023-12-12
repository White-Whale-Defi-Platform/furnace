import { ASSETS } from '@/constants'
import type { Asset } from '@/types'

// Todo: Comment
export const selectAssetByName = (name: string): Asset => ASSETS.find(asset => asset.name === name) ?? ASSETS[ASSETS.length - 1]
