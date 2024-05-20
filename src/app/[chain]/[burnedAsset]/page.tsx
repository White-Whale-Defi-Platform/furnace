'use client'
import React, { useState } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { fcAssetConvert, isValidTokenInput, findRegistryAssetBySymbol } from '@/util'
import { useRecoilValueLoadable } from 'recoil'
import { assetPairWithBalanceSelector, balanceSelector } from '@/state'
import { useRouter } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout, BurnerForm } from '@/components'
import { useChainContext } from '@/hooks'
import type { Asset } from '@/types'

const Burn = ({
  params
}: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const { chain: chainName, burnedAsset: urlAssetName } = params
  const registryBurnAsset: Asset = findRegistryAssetBySymbol(chainName, urlAssetName) ?? fcAssetConvert({ denom: urlAssetName, subdenom: urlAssetName.toUpperCase() })
  const registryMintAsset: Asset = findRegistryAssetBySymbol(chainName, `ash${urlAssetName}`) ?? fcAssetConvert({ denom: '', subdenom: `ash${urlAssetName.toUpperCase()}` })

  const router = useRouter()
  const [input, setInput] = useState('')

  const { address } = useChainContext(chainName)

  const fuels = useRecoilValueLoadable(
    assetPairWithBalanceSelector({
      chainName,
      burnDenomName: urlAssetName,
      address
    })
  )

  const onChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    isValidTokenInput(value) && setInput(value)
  }

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
