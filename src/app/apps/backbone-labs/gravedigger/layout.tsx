'use client'
import { useChainContext } from '@/hooks'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { fetchPreviousBatches, type FetchPreviousBatchesResponse, type FetchStateResponse, fetchUnbondRequestByUser, type FetchUnbondRequestByUserResponse } from './queries'
import { backboneLabsAtom } from './state'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const setState = useSetRecoilState(backboneLabsAtom)
  const chain = useChainContext()

  useEffect(
    () => {
      const fetchAndSet = (): void => {
        const runFetch = async (): Promise<void> => {
          setState(prev => ({ ...prev, loading: true }))
          const stateResponse: FetchStateResponse = await fetch('/api/apps/backbone-labs/gravedigger/state').then(async response => await (response.json() as Promise<FetchStateResponse>))
          setState(prev => ({ ...prev, state: { gravedigger: { ...prev.state.gravedigger, exchangeRate: Number(stateResponse.data.exchange_rate) } } }))
          if (chain.address !== undefined) {
            const unbondRequestResponse: FetchUnbondRequestByUserResponse = await fetchUnbondRequestByUser(chain.address)
            const unbondings: Array<{ amount: number, start: number, end: number }> = []

            for (const request of unbondRequestResponse.data) {
              const previousBatches: FetchPreviousBatchesResponse = await fetchPreviousBatches(request.id - 1)
              const batch = previousBatches.data.at(0)

              if (batch !== undefined && batch.id === request.id) {
                unbondings.push({
                  amount: Math.round(Number(request.shares) * (Number(batch.amount_unclaimed) / Number(batch.total_shares))),
                  start: batch.est_unbond_end_time - (21 * 24 * 60 * 60),
                  end: batch.est_unbond_end_time

                })
              }
            }
            setState(prev => ({ ...prev, state: { gravedigger: { ...prev.state.gravedigger, unbondings } } }))
          }
        }
        runFetch()
          .catch((error: Error) => setState(prev => ({ ...prev, error })))
          .finally(() => setState(prev => ({ ...prev, loading: false })))
      }
      fetchAndSet()
      const timeout = setInterval(fetchAndSet, 6000)
      return () => clearInterval(timeout)
    },
    [setState, chain.address]
  )
  return <>{children}</>
}

export default Layout
