'use client'
import { Unstable_Grid2 as Grid, Paper, styled, Typography } from '@mui/material'
import React, { useEffect, type FC, useState } from 'react'
import { BurnPieChart, AssetBurnedTable } from '@/components'
import { assets } from 'chain-registry'
import { useSigningCosmWasmClient } from '../../../src/hooks/useSigningCosmWasmClient'
import { Leaderboard } from '@mui/icons-material'
import type { LeaderboardResponse } from '@/codegen/Furnace.types'
import type { FurnaceQueryClient } from '@/codegen/Furnace.client'
import { useFetchLeaderboard } from '@/hooks/useFetchLeaderboard'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
  // const { result: client } = useSigningCosmWasmClient('osmosis')

  // // this is for the chain asset info
  // useEffect(() => {
  //   if (client != null) {
  //     // Grab the entire assetlist from the chain registry specific to THIS chain that we're looking for assets on
  //     const chainAssets = assets.find(({ chain_name: assetlistChainName }) => assetlistChainName === 'osmosis')?.assets ?? []
  //     client.config()
  //       .then((resp) => console.log(resp, 'config'))
  //       .catch((e) => console.error(e))
  //     void client.fuels({})
  //       .then((resp) => console.log(resp.fuels.map(({ denom }) => chainAssets.find(({ base }) => base === denom)), 'fuels'))
  //   }
  // }, [client])

  console.log(useFetchLeaderboard('osmosis', 'factory/osmo17fel472lgzs87ekt9dvk0zqyh5gl80sqp4sk4n/LAB'))
  return (
    <Grid gap={3} container justifyContent="space-between">
      <DashboardBox>
        <Typography color='GrayText'>
          Total Value Burned
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>1,000,000</Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color='GrayText'>
          Chains Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >1</Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color='GrayText'>
          Assets Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >2</Typography>
      </DashboardBox>
      <Grid xs={12}>
        <DashboardBox>
        <AssetBurnedTable/>
        </DashboardBox>
      </Grid>
      <Grid xs={12}>
        <BurnPieChart />
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
