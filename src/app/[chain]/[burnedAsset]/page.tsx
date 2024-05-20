'use client'
import React, { useState } from 'react'
import { Grid, Typography, Card } from '@mui/material'
import { isValidTokenInput } from '@/util'
import { useRecoilValueLoadable } from 'recoil'
import { assetPairWithBalanceSelector, balanceSelector } from '@/state'
import { useRouter } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout } from '@/components'
import { useChainContext } from '@/hooks'

const Burn = ({
  params
}: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const { chain, burnedAsset: urlAssetName } = params
  const router = useRouter()
  const [input, setInput] = useState('')

  const { address } = useChainContext(chain)

  const fuels = useRecoilValueLoadable(
    assetPairWithBalanceSelector({
      chainName: chain,
      burnDenomName: urlAssetName,
      address
    })
  )

  const onChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    isValidTokenInput(value) && setInput(value)
  }

  const canExecute =
    Number(input) !== 0 &&
    Number(input) * Math.pow(10, fuels.valueMaybe()?.burnAsset.decimals ?? 0) <=
      (fuels.valueMaybe()?.burnAsset.amount ?? 0)
  const action =
    input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'
  const subtitle =
    fuels.state !== 'hasValue'
      ? `Burn ${urlAssetName}`
      : `Burn ${fuels.contents.burnAsset.name} and Receive ${fuels.contents.mintAsset.name}`

  return (
    <PageLayout
      title={`${params.burnedAsset.toUpperCase()} Furnace`}
      subtitle={subtitle}
    >
      <Grid container alignItems="center" justifyContent="center" >
        {fuels.state !== 'hasValue'
          ? (
          <Grid container alignItems="center" justifyContent="center" minHeight="65vh">
            <Grid item container maxWidth={512}>
              <Grid item xs={12}>
                <Card sx={{ minHeight: '35vh' }}>
                  {' '}
                  <Typography align="center" padding={5} fontSize={24}>
                    Loading...
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
            )
          : (
          <>
            {' '}
            <Burner
              chainName={chain}
              nativeAsset={fuels.contents.burnAsset}
              mintAsset={fuels.contents.mintAsset}
              input={input}
              onChange={onChange}
            />
            <LeaderboardLayout
              chainName={chain}
              burnDenom={fuels.contents.burnAsset}
              mintDenom={fuels.contents.mintAsset}
              userAddress={address}
            />
          </>
            )}
      </Grid>
    </PageLayout>
  )
}

export default Burn
