'use client'
import { useChainContext } from '@/hooks'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { fetchUnbondRequestsByUserDetails, type FetchUnbondRequestsByUserDetailsResponse, type FetchStateResponse } from './queries'
import { erisProtocolAtom } from './state'

// Todo: Comment
const Layout: FC<PropsWithChildren> = ({ children }) => {
  const setState = useSetRecoilState(erisProtocolAtom)
  const chain = useChainContext()

  useEffect(
    () => {
      const fetchAndSet = (): void => {
        const runFetch = async (): Promise<void> => {
          setState(prev => ({ ...prev, loading: true }))
          const stateResponse = await fetch('/api/apps/eris-protocol/amplifier/state').then(async response => await (response.json() as Promise<FetchStateResponse>))
          setState(prev => ({ ...prev, state: { amplifier: { ...prev.state.amplifier, exchangeRate: Number(stateResponse.data.exchange_rate) } } }))
          if (chain.address !== undefined) {
            const unbondRequestResponse: FetchUnbondRequestsByUserDetailsResponse = await fetchUnbondRequestsByUserDetails(chain.address)
            const unbondings: Array<{ amount: number, start: number, end: number }> = unbondRequestResponse.data.map(request => {
              const amount = Math.round(Number(request.shares) * Number(stateResponse.data.exchange_rate))
              const end = request.pending?.est_unbond_start_time ?? (Date.now() / 1000 + (21 * 24 * 60 * 60))
              const start = end - (21 * 24 * 60 * 60)
              return {
                amount,
                start,
                end
              }
            })

            setState(prev => ({ ...prev, state: { amplifier: { ...prev.state.amplifier, unbondings } } }))
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
