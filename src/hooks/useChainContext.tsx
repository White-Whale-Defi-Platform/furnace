'use client'
import type { ChainWalletContext } from '@cosmos-kit/core'
import { useChainWallet } from '@cosmos-kit/react'

// Todo: Comment
export const useChainContext = (): ChainWalletContext => {
  const chain = useChainWallet('migaloo', 'keplr-extension', false)

  return chain
}
