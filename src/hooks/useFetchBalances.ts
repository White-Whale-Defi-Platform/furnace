'use client'
import { ENDPOINTS, FETCH_INTERVAL } from '@/constants'
import { fetchBalances } from '@/lib/fetchBalances'
import type { Coin } from '@cosmjs/stargate'
import { useEffect, useMemo, useState } from 'react'
import type { AsyncHook } from '@/types'
import { useChainContext } from './useChainContext'

export type UseFetchBalancesResult = AsyncHook<Coin[]>

export const useFetchBalances = (chainName: string): UseFetchBalancesResult => {
  const [result, setResult] = useState<UseFetchBalancesResult>({ result: [], loading: false, error: null })
  const userAddress = useChainContext(chainName).data?.bech32Address

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (userAddress === undefined) return
      setResult(prev => ({ ...prev, loading: true }))
      fetchBalances(ENDPOINTS[chainName].rest[0], userAddress)
        .then(response => setResult(prev => ({ ...prev, result: response.balances, error: null })))
        .catch((error: Error) => setResult(prev => ({ ...prev, error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }
    fetchAndSet()
    const timeout = setInterval(fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(timeout)
  },
  [userAddress, chainName, setResult]
  )

  return useMemo(() => result, [result])
}
