'use client'
import React, { useEffect, useState } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { fcAssetConvert, isValidTokenInput, findRegistryAssetBySymbol, fetchChainRegistryAsset } from '@/util'
import { useRecoilValueLoadable } from 'recoil'
import { allChainAssetsSelector, assetPairWithBalanceSelector } from '@/state'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout, BurnerForm } from '@/components'
import { useChainContext, useFetchAllChainAssets } from '@/hooks'
import type { Asset } from '@/types'
import { ENDPOINTS } from '@/constants'

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
  const path = usePathname()

  const router = useRouter()
  const [input, setInput] = useState('')

  const { address } = useChainContext(chainName)

  const fuels = useRecoilValueLoadable(
    assetPairWithBalanceSelector({
      chainName,
      burnAssetName: urlAssetName,
      address
    })
  )

  useEffect(() => {
    if (!(chainName in ENDPOINTS)) {
      redirect('/')
    }
  }, [chainName])

  useEffect(() => {
      const fuelsResp =  fuels.toPromise()
      console.log('useEffect', fuelsResp)
      if (!fuelsResp) redirect('/')
  }, [fuels])

  const onChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    isValidTokenInput(value) && setInput(value)
  }

  const subtitle =
    fuels.state !== 'hasValue'
      ? `Burn ${urlAssetName}`
      : `Burn ${fuels.valueMaybe()?.burnAsset.name} and Receive ${fuels.valueMaybe()?.mintAsset.name}`


  if (fuels.state === "hasValue" && fuels.contents?.burnAsset == undefined) 
    return <>Cant display token because it's not burnable
    </>
 
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
