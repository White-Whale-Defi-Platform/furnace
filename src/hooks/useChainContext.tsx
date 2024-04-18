'use client'
import type { ChainWalletContext } from '@cosmos-kit/core'
import { useChainWallet } from '@cosmos-kit/react'

// Todo: Comment
export const useChainContext = (chainName: string): ChainWalletContext => {
  const chain = useChainWallet(chainName, 'keplr-extension', false)

  return chain
}
