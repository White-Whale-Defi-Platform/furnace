'use client'
import React, { useState, type FC } from 'react'
import type { Asset } from '@/types'
import type { ChainName } from '@/constants'
import { useExecuteBurn } from '@/hooks'
import { BurnerForm } from './BurnerForm'
import { chains } from 'chain-registry'

interface Props {
  nativeAsset: Asset
  mintAsset: Asset
  isLoading: boolean
  chainName: ChainName
}

export const Burner: FC <Props> = ({ chainName, nativeAsset, mintAsset }) => {
  const [burnDisplayAmount, setBurnDisplayAmount] = useState('')
  const amount = Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals)
  const denom = chains.find(({ chain_name: chain }) => chain === chainName)?.fees?.fee_tokens[0].denom ?? ""
  const executeBurn = useExecuteBurn(chainName, amount, denom)
  return (
    <BurnerForm
     disabled={false}
     chainName={chainName}
     burnDisplayAmount={burnDisplayAmount}
     onChange={setBurnDisplayAmount}
     nativeAsset={nativeAsset}
     mintAsset={mintAsset}
     executeBurn={executeBurn}
    />
  )
}

export default Burner