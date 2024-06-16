'use client'
import { ENDPOINTS } from '@/constants'
import { type UseAccountResult, useAccount } from 'graz'

export const useChainContext = (chainName: string): UseAccountResult<{
  chainId: string
}> => {
  const chain = ENDPOINTS[chainName].chainId
  return useAccount({ chainId: chain })
}

export const chainIdConvert = (chainName: string): string => ENDPOINTS[chainName].chainId
