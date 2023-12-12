'use client'
import { useState, useEffect, useMemo } from 'react'
import { fetchHeight } from '@/lib'
import { ENDPOINTS, FETCH_INTERVAL } from '@/constants'
import type { AsyncHook } from '@/types'

// Todo: Comment
export type UseFetchHeightResult = AsyncHook<number>

// Todo: Comment
export const useFetchHeight = (): UseFetchHeightResult => {
  const [result, setResult] = useState<UseFetchHeightResult>({ result: 0, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      setResult(prev => ({ ...prev, loading: true }))
      fetchHeight(ENDPOINTS.migaloo.rest[0])
        .then(height => setResult(prev => ({ ...prev, result: Number(height.block.header.height), error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }

    fetchAndSet()
    const timeout = setInterval(fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(timeout)
  }, [setResult])

  return useMemo(() => result, [result])
}
