'use client'
import { useState, useEffect, useMemo } from 'react'
import { useChainContext } from './useChainContext'
import type { AsyncHook } from '@/types'
import { ENDPOINTS } from '@/constants'
import { FurnaceQueryClient } from '@/codegen'

// Todo: Comment
export type UseSigningCosmWasmClientResult = AsyncHook<FurnaceQueryClient | null>

// Todo: Comment
export const useSigningCosmWasmClient = (chainName: string): UseSigningCosmWasmClientResult => {
  const { isWalletConnected, getSigningCosmWasmClient } = useChainContext(chainName)
  const [result, setResult] = useState<UseSigningCosmWasmClientResult>({ result: null, loading: false, error: null })

  useEffect(
    () => {
      if (!isWalletConnected) return
      setResult(prev => ({ ...prev, loading: true }))
      getSigningCosmWasmClient()
        .then(client => {
          return setResult(prev => ({ ...prev, result: new FurnaceQueryClient(client, ENDPOINTS[chainName].contractAddress), error: null }))
        })
        .catch((error: Error) => setResult(prev => ({ ...prev, error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    },
    // Hack: Cosmos Kit is broken; dependency changes frequently.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected]
  )

  return useMemo(() => result, [result])
}
