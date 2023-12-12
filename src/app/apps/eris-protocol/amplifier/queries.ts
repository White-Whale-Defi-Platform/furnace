import { ENDPOINTS } from '@/constants'
import { createPayload, fetchJson } from '@/util'
import { Contracts } from '@/app/apps/eris-protocol/amplifier/constants'

// Todo: Comment
export interface FetchStatePayload {
  state: Record<string, never>
}

// Todo: Comment
export interface FetchStateResponse {
  data: {
    total_usteak: string
    total_native: string
    exchange_rate: string
    unlocked_coins: []
  }
}

// Todo: Comment
export const createFetchStatePayload = (): string => createPayload<FetchStatePayload>({
  payload: {
    state: {}
  }
})

// Todo: Comment
export const fetchState = async (): Promise<FetchStateResponse> => await fetchJson(`${ENDPOINTS.migaloo.rest[0]}/cosmwasm/wasm/v1/contract/${Contracts.Amplifier.Whale}/smart/${createFetchStatePayload()}`)

// Todo: Comment
export interface FetchUnbondRequestsByUserDetailsPayload {
  unbond_requests_by_user_details: {
    user: string
  }
}

// Todo: Comment
export interface FetchUnbondRequestsByUserDetailsResponse {
  data: Array<{
    id: number
    shares: string
    state: string
    batch: unknown
    pending: {
      id: number
      ustake_to_burn: string
      est_unbond_start_time: number
    } | null
  }>
}

// Todo: Comment
export const createFetchUnbondRequestsByUserDetailsPayload = (address: string): string => createPayload<FetchUnbondRequestsByUserDetailsPayload>({
  payload: {
    unbond_requests_by_user_details: {
      user: address
    }
  }
})

// Todo: Comment
export const fetchUnbondRequestsByUserDetails = async (address: string): Promise<FetchUnbondRequestsByUserDetailsResponse> => await fetchJson(`${ENDPOINTS.migaloo.rest[0]}/cosmwasm/wasm/v1/contract/${Contracts.Amplifier.Whale}/smart/${createFetchUnbondRequestsByUserDetailsPayload(address)}`)
