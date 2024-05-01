'use client'
import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { isValidTokenInput } from '@/util'
import { useRecoilValue, useRecoilValueLoadable, waitForAll } from 'recoil'
import { assetPairSelector, chainAssetsSelector, furnaceSelector } from '@/state'
import { useRouter } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout } from '@/components'
import { useExecuteBurn, useFetchBalances } from '@/hooks'

const Burn = ({ params }: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const { chain, burnedAsset: urlAssetName } = params
  const router = useRouter()

  const [input, setInput] = useState('')

  const fuels = useRecoilValueLoadable(assetPairSelector({ chainName: chain, burnDenomName: urlAssetName }))
  const { result } = useFetchBalances(chain)

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }
  const executeBurn = useExecuteBurn(chain, Number(input) * Math.pow(10, fuels.valueMaybe()?.burnAsset.decimals ?? 0))
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, fuels.valueMaybe()?.burnAsset.decimals ?? 0)) <= (fuels.valueMaybe()?.burnAsset.amount ?? 0)
  const action = input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'

  if (fuels.state !== 'hasValue') { return <Typography>Loading...</Typography> } else if (fuels.contents == null) return <Typography>No valid assets found</Typography>

  const { mintAsset, burnAsset } = fuels.contents

  return (
     <PageLayout title={`${params.burnedAsset.toUpperCase()} Furnace`} subtitle={`Burn ${burnAsset.name} and Receive ${mintAsset.name}`}>
      <Grid container alignItems='center' justifyContent='center' gap={5} >
        <Burner chainName={chain} nativeAsset={burnAsset} mintAsset={mintAsset} input={input} onChange={onChange} />
        <LeaderboardLayout chainName={chain} burnDenom={burnAsset} />
      </Grid>
    </PageLayout>
  )
}

export default Burn
