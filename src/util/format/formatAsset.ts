import type { Asset } from '@/types'
import type { Coin } from '@cosmjs/stargate'

/**
* Returns the formatted token amount
* `formatTokenAmount(3000) -> "3,000.00"`
*/
export const formatTokenAmount = (data: number): string =>
  new Intl.NumberFormat().format(data)

/**
 * Takes an amount of token and formats it with the given exponenet
 * `formatTokenAmount(300000, 2) -> "3,000.00"`
 */
export const formatAmountWithExponent = (amount: number, exponent: number): string => amount === 0 ? '0' : (amount / Math.pow(10, exponent)).toString()

export const formatAssetAmount = (asset: Asset): string => formatAmountWithExponent(asset.amount, asset.decimals)

export const updateAssetAmount = <A extends Asset>(asset: A, { amount }: Coin): A => ({
  ...asset,
  amount: Number(amount),
})
