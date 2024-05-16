'use client'
import React, { useEffect, useState } from 'react'
import { Unstable_Grid2 as Grid, Typography } from '@mui/material'
import { fcAssetConvert, isValidTokenInput, findRegistryAssetBySymbol } from '@/util'
import { useRecoilValueLoadable } from 'recoil'
import { assetPairWithBalanceSelector } from '@/state'
import { redirect } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout, BurnerForm } from '@/components'
import { useChainContext } from '@/hooks'
import type { Asset } from '@/types'

const Burn = ({
  params: { chainName, urlAssetName }
}: {
  params: {
    chainName: string
    urlAssetName: string
  }
}): JSX.Element => {
  const registryBurnAsset: Asset = findRegistryAssetBySymbol(chainName, urlAssetName) ?? fcAssetConvert({ denom: urlAssetName, subdenom: urlAssetName.toUpperCase() })
  const registryMintAsset: Asset = findRegistryAssetBySymbol(chainName, `ash${urlAssetName}`) ?? fcAssetConvert({ denom: '', subdenom: `ash${urlAssetName.toUpperCase()}` })
  const [input, setInput] = useState('')
  const { address } = useChainContext(chainName)
  console.log('page/parents', address, chainName)
  
  const fuels = useRecoilValueLoadable(
    assetPairWithBalanceSelector({
      chainName,
      burnAssetName: urlAssetName,
      address
    })
  )

  const loadedBurnAsset = fuels.contents?.burnAsset

  useEffect(
    () => {
      // Redirect to the homepage if the fuel asset does not exist in the furnace
      if (fuels.state === 'hasValue' && loadedBurnAsset === undefined) { redirect('/') }
    }, [loadedBurnAsset, fuels.state])

  const onChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    isValidTokenInput(value) && setInput(value)
  }

  const subtitle =
    fuels.state !== 'hasValue'
      ? `Burn ${urlAssetName}`
      : `Burn ${fuels.valueMaybe()?.burnAsset.name} and Receive ${fuels.valueMaybe()?.mintAsset.name}`

  return (
    <PageLayout
      title={`${urlAssetName.toUpperCase()} Furnace`}
      subtitle={subtitle}
    >
      <Grid container alignItems="center" justifyContent="center" >
        {fuels.state !== 'hasValue'
          ? (
          <BurnerForm
            nativeAsset={registryBurnAsset}
            mintAsset={registryMintAsset}
            onChange={() => undefined }
            burnDisplayAmount={''}
            disabled
            chainName={chainName} />
            )
          : typeof fuels.contents === 'undefined'
            ? <Typography>No Token Found</Typography>
            : (
          <Grid>
           <Burner
              chainName={chainName}
              nativeAsset={fuels.contents.burnAsset}
              mintAsset={fuels.contents.mintAsset}
              input={input}
              onChange={onChange}
            />
            <LeaderboardLayout
              chainName={chainName}
              burnDenom={fuels.contents.burnAsset}
              mintDenom={fuels.contents.mintAsset}
              userAddress={address}
            />
          </Grid>
              )}
      </Grid>
    </PageLayout>
  )
}

export default Burn
