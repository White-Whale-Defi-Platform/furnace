'use client'
import { useState, useEffect, useMemo } from 'react'
import { useChainContext } from './useChainContext'
import type { AsyncHook } from '@/types'
import { type ChainName, ENDPOINTS } from '@/constants'
import { FurnaceQueryClient } from '@/codegen'
import { useChains } from '@cosmos-kit/react'
import { useQueries } from '@tanstack/react-query'
import { useRecoilStateLoadable } from 'recoil'
import type { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { clientsAtom } from '@/state'

// Todo: Comment
export type UseSigningCosmWasmClientResult =
  AsyncHook<FurnaceQueryClient | null>

export const getClient = async (
  chainName: ChainName,
  getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>): Promise<FurnaceQueryClient> => {
  const cwClient = await getSigningCosmWasmClient()

  return new FurnaceQueryClient(
    cwClient,
    ENDPOINTS[chainName].contractAddress
  )
}

/**
 * Fetches all the furnace clients for each of the chains in the ENDPOINTS object
 * and stores them in the clients atom/recoil
 */
export const useAllSigningCosmWasmClient = (): void => {
  const [_, setClients] = useRecoilStateLoadable(clientsAtom)

  const chainNames: ChainName[] = Object.keys(ENDPOINTS)
  // multiple chains connected at one time
  const chainContexts = useChains(chainNames)

  useEffect(
    () => {
      void Promise.all(chainNames.map(async (chainName: string) => {
        const client = await chainContexts[chainName].getCosmWasmClient()
        return [chainName, new FurnaceQueryClient(
          client,
          ENDPOINTS[chainName].contractAddress
        )]
      }))
        .then(Object.fromEntries).then(setClients)
    },
    []
  )
}

/**
 * Gets the Cosmwasm client for the furnace on a given chain.
 * Note: Will not return the client until the user has connected their wallet.
 * @param chainName The name of the chain for the client that you want.
 * @returns The client that can be used to interact with the furnace.
 */
export const useSigningCosmWasmClient = (
  chainName: string
): UseSigningCosmWasmClientResult => {
  const { isWalletConnected, getSigningCosmWasmClient } =
    useChainContext(chainName)
  const [result, setResult] = useState<UseSigningCosmWasmClientResult>({
    result: null,
    loading: false,
    error: null
  })
  useEffect(
    () => {
      if (!isWalletConnected) return
      setResult((prev) => ({ ...prev, loading: true }))
      getClient(chainName, getSigningCosmWasmClient)
        .then((client) => {
          return setResult((prev) => ({
            ...prev,
            result: client,
            error: null
          }))
        })
        .catch((error: Error) => setResult((prev) => ({ ...prev, error })))
        .finally(() => setResult((prev) => ({ ...prev, loading: false })))
    },
    // Hack: Cosmos Kit is broken; dependency changes frequently.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected]
  )

  return useMemo(() => result, [result])
}

/**
 * Gets every chain's Cosmwasm client for interacting with the furnace.
 * @returns All of the clients in an object, keyed by the chain name.
 */
export const useAllChainCosmWasmClientsReactquery = (): {
  data: Partial<Record<string, FurnaceQueryClient>>
  isLoading: boolean
  isError: boolean
} => {
  const chainNames = Object.keys(ENDPOINTS)
  // multiple chains connected at one time
  const chainContexts = useChains(chainNames)

  const clients = useQueries({
    queries: chainNames.map((chainName) => ({
      queryKey: ['cwClient', chainName],
      queryFn: async (): Promise<
      [chainName: string, furnaceClient: FurnaceQueryClient]
      > => {
        const cwClient = await chainContexts[chainName].getCosmWasmClient()

        return [
          chainName,
          new FurnaceQueryClient(
            cwClient,
            ENDPOINTS[chainName].contractAddress
          )
        ]
      }
    }))
  })

  const entries = clients.flatMap(({ data }) => (data != null ? [data] : []))

  return {
    data: Object.fromEntries(entries),
    isLoading: clients.some(({ isLoading }) => isLoading),
    isError: clients.some(({ isError }) => isError)
  }
}
