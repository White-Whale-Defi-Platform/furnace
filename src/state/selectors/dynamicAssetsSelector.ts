import { ENDPOINTS } from '@/constants'
import { ChainRegistryClient } from '@chain-registry/client'
import { selector } from 'recoil'

/**
 * This selector fetches up-to-date data available without needing to manually update the package.json
 */
export const dynamicAssetsSelector = selector({
  key: 'chainRegistryAssetList',
  get: async () => {
    // create an instance of ChainRegistryClient by passing in the chain names
    const chainRegistryClient = new ChainRegistryClient({
      chainNames: Object.keys(ENDPOINTS)
    })
    await chainRegistryClient.fetchUrls()
    return chainRegistryClient
  }
})
