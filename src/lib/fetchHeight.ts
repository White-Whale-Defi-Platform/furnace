import { fetchJson } from '@/util'
export interface FetchHeightResponse {
  block: {
    header: {
      height: string
    }
  }
}

export const fetchHeight = async (endpoint: string): Promise<FetchHeightResponse> => await fetchJson(`${endpoint}/cosmos/base/tendermint/v1beta1/blocks/latest`)
