'use client'
import { useState, useEffect, useMemo } from 'react'
import type { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useChainContext } from './useChainContext'
import type { AsyncHook } from '@/types'

// Todo: Comment
export type UseSigningCosmWasmClientResult = AsyncHook<SigningCosmWasmClient | null>

// Todo: Comment
export const useSigningCosmWasmClient = (): UseSigningCosmWasmClientResult => {
  const { isWalletConnected, getSigningCosmWasmClient } = useChainContext()
  const [result, setResult] = useState<UseSigningCosmWasmClientResult>({ result: null, loading: false, error: null })

  useEffect(
    () => {
      if (!isWalletConnected) return
      setResult(prev => ({ ...prev, loading: true }))
      getSigningCosmWasmClient()
        .then(client => setResult(prev => ({ ...prev, result: client, error: null })))
        .catch((error: Error) => setResult(prev => ({ ...prev, error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    },
    // Hack: Cosmos Kit is broken; dependency changes frequently.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected]
  )

  return useMemo(() => result, [result])
}
