import { ASSETS } from '@/constants'
import type { Asset } from '@/types'

export const selectAssetByName = (name: string): Asset => ASSETS.find(asset => asset.name === name) ?? ASSETS[ASSETS.length - 1]
