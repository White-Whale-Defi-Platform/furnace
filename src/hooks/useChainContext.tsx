'use client'
import { ENDPOINTS } from '@/constants'
import { useAccount } from 'graz'

export const useChainContext = (chainName: string) => {
  const chain = ENDPOINTS[chainName].chainId
  return useAccount({ chainId: chain })
}

export const chainIdConvert = (chainName: string) => ENDPOINTS[chainName].chainId