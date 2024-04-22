'use client'
import { Unstable_Grid2 as Grid, Paper, styled, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { BurnPieChart, AssetBurnedTable } from '@/components'
import { useFetchChainAssets, useFetchTableData } from '@/hooks'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
  const fetchChainAsset = useFetchChainAssets('osmosis')
  const fetchDashboardData = useFetchTableData('osmosis')

  const assetInfo = {
    osmosis: (fetchChainAsset.data != null && fetchDashboardData != null)
      ? fetchChainAsset.data.map((asset) => ({
        asset,
        burned: (fetchDashboardData.totalBurnedAssets) / Math.pow(10, asset.decimals),
        uniques: fetchDashboardData.uniqueBurners
      }))
      : []
  }
  const assetData = Object.entries(assetInfo).flatMap(([chain, chainInfo]) =>
    chainInfo.map((asset) => ({ chain, ...asset })))

  return (
    <Grid gap={3} container justifyContent="space-between">
      <DashboardBox>
        <Typography color='GrayText'>
          Total Value Burned
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>-</Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color='GrayText'>
          Chains Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >{Object.keys(assetInfo).length}</Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color='GrayText'>
          Assets Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >{assetData.length}
          </Typography>
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
