import { fetchJson } from '@/util'

// Todo: Comment
export interface FetchHeightResponse {
  block: {
    header: {
      height: string
    }
  }
}

// Todo: Comment
export const fetchHeight = async (endpoint: string): Promise<FetchHeightResponse> => await fetchJson(`${endpoint}/cosmos/base/tendermint/v1beta1/blocks/latest`)
