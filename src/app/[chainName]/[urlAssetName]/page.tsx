'use client'
import React, { useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import {
  fcAssetConvert,
  findRegistryAssetBySymbol,
  formatPrettyName,
} from '@/util'
import { useRecoilValueLoadable } from 'recoil'
import { assetPairWithBalanceSelector } from '@/state'
import { redirect } from 'next/navigation'
import {
  Burner,
  PageLayout,
  LeaderboardLayout,
  BurnerForm,
} from '@/components'
import { useChainContext } from '@/hooks'
import type { Asset } from '@/types'

const Burn = ({
  params: { chainName, urlAssetName },
}: {
  params: {
    chainName: string
    urlAssetName: string
  }
}): JSX.Element => {
  const registryBurnAsset: Asset
    = findRegistryAssetBySymbol(chainName, urlAssetName)
    ?? fcAssetConvert({
      denom: urlAssetName,
      subdenom: urlAssetName.toUpperCase(),
    })
  const registryMintAsset: Asset
    = findRegistryAssetBySymbol(chainName, `ash${urlAssetName}`)
    ?? fcAssetConvert({ denom: '', subdenom: `ash${urlAssetName.toUpperCase()}` })
  const chain = useChainContext(chainName)
  const address = chain.data?.bech32Address
  const fuels = useRecoilValueLoadable(
    assetPairWithBalanceSelector({
      chainName,
      burnAssetName: urlAssetName,
      address,
    })
  )
  const loadedBurnAsset = fuels.valueMaybe()?.burnAsset

  useEffect(() => {
    // Redirect to the homepage if the fuel asset does not exist in the furnace
    if (fuels.state === 'hasValue' && loadedBurnAsset === undefined) {
      redirect('/')
    }
  }, [loadedBurnAsset, fuels.state])
  return (
    <>
      <PageLayout
        title={`${formatPrettyName(chainName)} - ${urlAssetName.toUpperCase()}`}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid>
            { fuels.state === 'hasValue' && fuels.contents != null
              ? (
                <Burner
                  chainName={chainName}
                  nativeAsset={fuels.contents.burnAsset}
                  mintAsset={fuels.contents.mintAsset}
                />
                )
              : (
                <BurnerForm
                  nativeAsset={registryBurnAsset}
                  mintAsset={registryMintAsset}
                  onChange={() => undefined}
                  burnDisplayAmount=""
                  loading
                  chainName={chainName}
                />
                )}
            <LeaderboardLayout
              chainName={chainName}
              burnDenom={fuels.valueMaybe()?.burnAsset ?? { ...fcAssetConvert({ denom: urlAssetName, subdenom: urlAssetName }), inChainRegistry: false }}
              mintDenom={fuels.valueMaybe()?.mintAsset ?? { ...fcAssetConvert({ denom: `ash${urlAssetName.toUpperCase()}`, subdenom: `ash${urlAssetName.toUpperCase()}` }), inChainRegistry: false }}
            />
          </Grid>
        </Grid>
      </PageLayout>
    </>
  )
}

export default Burn
