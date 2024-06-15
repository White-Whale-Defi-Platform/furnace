'use client'
import React, { useState, type FC } from 'react'
import type { Asset } from '@/types'
import type { ChainName } from '@/constants'
import { useExecuteBurn } from '@/hooks'
import { BurnerForm } from './BurnerForm'

interface Props {
  nativeAsset: Asset
  mintAsset: Asset
  chainName: ChainName
}

export const Burner: FC <Props> = ({ chainName, nativeAsset, mintAsset }) => {
  const [burnDisplayAmount, setBurnDisplayAmount] = useState('')
  const amount = Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals)
  const executeBurn = useExecuteBurn(chainName, amount, nativeAsset.id)
  return (
    <BurnerForm
     loading={false}
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
