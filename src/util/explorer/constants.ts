import { ENDPOINTS, type ChainName } from '@/constants'

export const EXPLORER_URL = (chainName: ChainName): string => ENDPOINTS[chainName].explorerUrl
