import type { Asset } from '@/types'
import { BALANCE_FORMAT_DECIMALS, BASE } from './constants'

// Todo: Comment
export const formatAmount = (asset: Asset): string => (asset.amount / Math.pow(BASE, asset.decimals)).toFixed(BALANCE_FORMAT_DECIMALS)
