import type { ChainName } from '@/constants'
import { EXPLORER_URL } from './constants'

export const exploreAccount = (address: string, chainName: ChainName): string => `${EXPLORER_URL(chainName)}/account/${address}`
