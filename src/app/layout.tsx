import { Layout } from '@/components'
import { Provider } from '@/components/provider'
import type { Metadata } from 'next'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import { ENDPOINTS } from '@/constants'
import { assets } from 'chain-registry'
import type { Asset, AsyncHook } from '@/types'
import { type PropsWithChildren, type FC, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export const metadata: Metadata = {
  title: 'Migaloo',
  description: 'Your one stop shop for everything in the Migaloo ecosystem.',
  applicationName: 'Migaloo Command',
  authors: [{ name: 'Migaloo Foundation' }]
}

// export type UseQueryingChainAssetsResult = AsyncHook<{ nativeAsset: Asset, mintAsset: Asset } | undefined>

// const useQueryingChainAssets = (chainName: string, assetName: string): UseQueryingChainAssetsResult => {
//   const [result, setResult] = useState<UseQueryingChainAssetsResult>({ result: undefined, loading: false, error: null })
//   const { result: client } = useSigningCosmWasmClient()

//   useEffect(() => {
//     (async () => {
//       // we need a client in order to talk to the blockchain/smart contract. ensure that this exists before proceeding
//       if (client != null) {
//         // We're starting our query so let's update the state to say that the query is now loading/refetching
//         setResult(prev => ({ ...prev, loading: true }))

//         // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
//         const chainAssets = assets.find(({ chain_name: assetlistChainName }) =>
//           assetlistChainName === chainName)?.assets ?? []

//         // Run concurrent calls to the different contracts- one to each furnace contract address in the given chain
//         const furnaceAssets = await Promise.all(ENDPOINTS[chainName].furnaces
//           .map(async (furnaceAddress) => await client.queryContractSmart(furnaceAddress, { config: {} })
//             .then(({ native_denom: nativeDenom, mint_denom: mintDenom }) => {
//               const nativeAsset = chainAssets.find(({ base }) => base === nativeDenom)
//               const mintAsset = chainAssets.find(({ base }) => base === mintDenom)

//               return (((nativeAsset !== undefined) && (mintAsset != null))
//                 ? { nativeAsset: assetTypeMatch(nativeAsset), mintAsset: assetTypeMatch(mintAsset) }
//                 : undefined)
//             })))
//         const foundBurnAssets = furnaceAssets
//           .filter((asset) => asset !== undefined)
//           .find((asset) => asset.nativeAsset.name.toLowerCase() === assetName.toLowerCase())
//         console.log(foundBurnAssets, 'found')

//         setResult({ result: foundBurnAssets, loading: false, error: null })
//       }
//     })()
//       .catch((error: Error) => setResult(prev => ({ ...prev, error })))
//       .finally(() => setResult(prev => ({ ...prev, loading: false })))
//   },
//   [client, setResult, chainName, assetName]
//   )
//   return result
// }

// export default useQueryingChainAssets

// {"leaderboard": {"fuel_denom": "factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB"}}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" style={{ width: '100%', minHeight: '100vh' }}>
    <body>
      <Provider>
        <Layout>
          {children}
        </Layout>
      </Provider>
    </body>
  </html>
)

export default RootLayout
