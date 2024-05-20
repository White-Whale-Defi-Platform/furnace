import type { ChainName } from '@/constants'
import { EXPLORER_URL } from './constants'

export const exploreTx = (hash: string, chainName: ChainName): string => `${EXPLORER_URL(chainName)}/tx/${hash}`
