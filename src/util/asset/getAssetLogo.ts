import type { Asset as RegistryAsset } from '@chain-registry/types'
import { assets } from 'chain-registry'
import { crAssetConvert } from './assetTypesConvert'
import type { Asset } from '@/types'

/**
 * Utility function to get an asset's logo
 * @param asset asset from the chain registry
 * @returns uri of the asset logo if there is one
 */
export const getAssetLogo = ({ logo_URIs: logoURIs }: RegistryAsset): string | undefined =>
  logoURIs?.png ?? logoURIs?.svg

/**
 * Utility function to fetch specific chain asset data from the chain registry
 */
export const fetchChainRegistryAsset = (chainName: string): RegistryAsset[] | undefined =>
  assets.find(({ chain_name: registryChainName }) => registryChainName === chainName)?.assets

/**
 * Utility function to fetch specific chain asset data by its symbol from the chain registry
 */
export const findRegistryAssetBySymbol = (chainName: string, assetName: string, assetList = fetchChainRegistryAsset(chainName)): Asset | undefined => {
  const asset = assetList?.find(({ symbol }) => symbol.toLowerCase() === assetName.toLowerCase())
  return asset != null ? crAssetConvert(asset) : undefined
}
