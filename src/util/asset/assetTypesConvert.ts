import type { Asset as CRAsset } from '@chain-registry/types'
import type { Asset } from '@/types/app'
import { getAssetLogo } from './getAssetLogo'
import type { FuelConfig } from '@/codegen/Furnace.types'

const LOGO_PLACEHOLDER = '/assets/ashdao.jpg'

/**
 * Converts the asset from the chain registry to the internal app asset type
 * @param asset The asset from the chain registry
 * @returns Standard asset type that we use on the frontend
 */
export const crAssetConvert = (asset: CRAsset): Asset => {
  return {
    id: asset.base,
    name: asset.symbol,
    decimals: Math.max(...asset.denom_units.map(({ exponent }) => exponent)),
    logo: getAssetLogo(asset) ?? LOGO_PLACEHOLDER,
    amount: 0,
    description: {
      short: asset.name,
      long: asset.description ?? asset.name
    }
  }
}

/**
 * Converts the fuel config (from the furnace contract) to the internal app asset type.
 * NOTE: Fills a number of fields with placeholder values.
 * @param fuelConfigAsset The single asset we get from the fuel response from the contract
 * @returns Asset that we can use it on the frontend
 */
export const fcAssetConvert = ({ denom, subdenom }: FuelConfig): Asset => {
  return {
    id: denom,
    name: subdenom,
    decimals: 6,
    logo: LOGO_PLACEHOLDER,
    amount: 0,
    description: {
      short: subdenom,
      long: subdenom
    }
  }
}
