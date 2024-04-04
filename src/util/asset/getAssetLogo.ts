import type { Asset } from '@chain-registry/types'

/**
 * Utility function to get an asset's logo
 * @param asset asset from the chain registry
 * @returns uri of the asset logo if there is one
 */
export const getAssetLogo = ({ logo_URIs: logoURIs }: Asset): string | undefined =>
  logoURIs?.png ?? logoURIs?.svg
