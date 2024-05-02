import type { Asset } from '@/types'
import { BASE } from './constants'
import type { Coin } from '@cosmjs/stargate'

/**
* General token formatter that formats the token based on the region
*/
export const formatTokenAmount = (data: number): string =>
  new Intl.NumberFormat().format(data)

/**
 * Formats the token and divided by the asset decimals
 */
export const formatAssetAmount = (asset: Asset): string => formatTokenAmount(asset.amount / Math.pow(BASE, asset.decimals))

/**
 * Take the asset and overwrite the amount
 */
export const updateAssetAmount = (asset: Asset, { amount }: Coin): Asset => ({
  ...asset,
  amount: Number(amount)
})
