import { ENDPOINTS } from '@/constants'
import { createPayload, fetchJson } from '@/util'
import { Contracts } from './constants'

// State
export interface FetchStatePayload {
  state: Record<string, never>
}

export interface FetchStateResponse {
  data: {
    total_usteak: string
    total_native: string
    exchange_rate: string
    unlocked_coins: []
  }
}

export const createFetchStatePayload = (): string => createPayload<FetchStatePayload>({
  payload: {
    state: {}
  }
})

export const fetchState = async (): Promise<FetchStateResponse> => await fetchJson(`${ENDPOINTS.migaloo.rest[0]}/cosmwasm/wasm/v1/contract/${Contracts.Gravedigger.Whale}/smart/${createFetchStatePayload()}`)

// Previous Batches
export interface FetchPreviousBatchesPayload {
  previous_batches: { start_after: number }
}

export interface FetchPreviousBatchesResponse {
  data: Array<{
    id: number
    reconciled: boolean
    total_shares: string
    amount_unclaimed: string
    est_unbond_end_time: number
  }>
}

export const createFetchPreviousBatchesPayload = (startAfter: number): string => createPayload<FetchPreviousBatchesPayload>({
  payload: {
    previous_batches: { start_after: startAfter }
  }
})

export const fetchPreviousBatches = async (startAfter: number): Promise<FetchPreviousBatchesResponse> => await fetchJson(`${ENDPOINTS.migaloo.rest[0]}/cosmwasm/wasm/v1/contract/${Contracts.Gravedigger.Whale}/smart/${createFetchPreviousBatchesPayload(startAfter)}`)

// Unbond Requests
export interface FetchUnbondRequestByUserPayload {
  unbond_requests_by_user: {
    user: string
  }
}

export interface FetchUnbondRequestByUserResponse {
  data: [{
    id: number
    shares: string
  }]
}

export const createFetchUnbondRequestByUserPayload = (user: string): string => createPayload<FetchUnbondRequestByUserPayload>({
  payload: {
    unbond_requests_by_user: {
      user
    }
  }
})

export const fetchUnbondRequestByUser = async (user: string): Promise<FetchUnbondRequestByUserResponse> => await fetchJson(`${ENDPOINTS.migaloo.rest[0]}/cosmwasm/wasm/v1/contract/${Contracts.Gravedigger.Whale}/smart/${createFetchUnbondRequestByUserPayload(user)}`)
