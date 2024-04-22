import type { Asset as CRAsset } from '@chain-registry/types'
import type { Asset } from '@/types/app'
import { getAssetLogo } from './getAssetLogo'
import type { FuelConfig } from '@/codegen/Furnace.types'

const LOGO_PLACEHOLDER = '/assets/ashdao.jpg'

// converting the asset from the chain registry to the internal asset types
export const crAssetConvert = (chainRegistryAssets: CRAsset): Asset => {
  return {
    id: chainRegistryAssets.base,
    name: chainRegistryAssets.name,
    decimals: Math.max(...chainRegistryAssets.denom_units.map(({ exponent }) => exponent)),
    logo: getAssetLogo(chainRegistryAssets) ?? LOGO_PLACEHOLDER,
    amount: 0,
    description: {
      short: chainRegistryAssets.description ?? '',
      long: chainRegistryAssets.description ?? ''
    }
  }
}

// converting the asset from the fuel config to the internal asset types
export const fcAssetConvert = (fuelConfigAssets: FuelConfig): Asset => {
  return {
    id: fuelConfigAssets.denom,
    name: fuelConfigAssets.subdenom,
    decimals: 6,
    logo: LOGO_PLACEHOLDER,
    amount: 0,
    description: {
      short: fuelConfigAssets.subdenom,
      long: fuelConfigAssets.subdenom
    }
  }
}
