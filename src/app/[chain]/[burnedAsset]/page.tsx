'use client'
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { crAssetConvert, isValidTokenInput } from '@/util'
import { useRecoilValue } from 'recoil'
import { selectUserAsset } from '@/state'
import { ENDPOINTS } from '@/constants'
import { useRouter } from 'next/navigation'
import { Burner, PageLayout, LeaderboardLayout } from '@/components'
import { useExecuteBurn, useFetchChainAssets } from '@/hooks'
import { assets, chains } from 'chain-registry'

const Burn = ({ params }: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const { chain, burnedAsset: desiredFuelAsset } = params
  const router = useRouter()

  const [input, setInput] = useState('')
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const ash = useRecoilValue(selectUserAsset('Ash'))
  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }

  const allRegistryAssets = [...(assets.find(({ chain_name: chainName }) => chainName === chain)?.assets ?? []), {
    description: 'ashLAB - Burned LAB',
    extended_description: 'ashLAB - reciept token recieved when burning LAB via ASH DAOs Furnace',
    denom_units: [
      {
        denom: 'factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash',
        exponent: 0
      },
      {
        denom: 'ashLAB',
        exponent: 6
      }
    ],
    type_asset: 'sdk.coin',
    address: 'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07',
    base: 'factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash',
    name: 'Burned LAB',
    display: 'ashLAB',
    symbol: 'ashLAB',
    logo_URIs: {
      png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashLAB.png'
    },
    images: [
      {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ashLAB.png'
      }
    ]
  }]

  const { data: allChainAssets } = useFetchChainAssets(chain)
  const burnAsset = allChainAssets?.find(({ name }) => name.toLowerCase() === desiredFuelAsset)

  const mintRegistryAsset = (burnAsset != null)
    ? allRegistryAssets.find(({ base }) =>
      base === `factory/${ENDPOINTS[chain].contractAddress}/${desiredFuelAsset}.ash`)
    : undefined
  //  base.endsWith(`${desiredFuelAsset}.ash`))

  const mintAsset = (mintRegistryAsset != null) ? crAssetConvert(mintRegistryAsset) : undefined

  const burnAssetNotFound = typeof allChainAssets !== 'undefined' && typeof burnAsset === 'undefined'
  useEffect(() => {
    if (burnAssetNotFound || !(chain in ENDPOINTS)) {
      router.push('/')
    }
  }, [chain, desiredFuelAsset, router, burnAssetNotFound])

  const executeBurn = useExecuteBurn(chain, Number(input) * Math.pow(10, burnAsset?.decimals ?? 6))

  console.log({ allChainAssets, burnAsset, mintAsset, chain, input })

  if (burnAsset == null || mintAsset == null) {
    return <PageLayout title={`${burnAsset?.name ?? params.burnedAsset.toUpperCase()} Furnace`} subtitle={`Burn ${burnAsset?.name ?? params.burnedAsset}`}>
    <Grid container alignItems='center' justifyContent='center' gap={5} >
      <Typography>Loading...</Typography>
    </Grid>
  </PageLayout>
  }
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, burnAsset.decimals)) <= burnAsset.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'

  return (
     <PageLayout title={`${burnAsset.name} Furnace`} subtitle={`Burn ${burnAsset.name} and Receive ${mintAsset.name}`}>
      <Grid container alignItems='center' justifyContent='center' gap={5} >
        <Burner chainName={chain} nativeAsset={burnAsset} mintAsset={mintAsset} input={input} onChange={onChange} />
        <LeaderboardLayout mintDenom={mintAsset.name} />
      </Grid>
    </PageLayout>
  )
}

export default Burn
