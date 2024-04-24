'use client'
import {
  Unstable_Grid2 as Grid,
  Paper,
  styled,
  Typography
} from '@mui/material'
import React, { type FC } from 'react'
import { BurnPieChart, AssetBurnedTable } from '@/components'
import { useFetchAllChainAssets, useFetchAllLeaderboard } from '@/hooks'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
  const allChains = useFetchAllChainAssets()
  const allLeaderboard = useFetchAllLeaderboard()

  console.log(allLeaderboard, 'all leaderboard reutrn')
  return (
    <Grid gap={3} container justifyContent="space-between">
      <DashboardBox>
        <Typography color="GrayText">Total Value Burned</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>-</Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color="GrayText">Chains Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {allChains.length}
        </Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color="GrayText">Assets Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {allChains.some(
            ({ isLoading, isError, isPending }) =>
              isLoading || isError || isPending
          )
            ? '-'
            : allChains
              .map(({ data: chainInfo }) => chainInfo?.[1].length ?? 0)
              .reduce((x, y) => x + y, 0)}
        </Typography>
      </DashboardBox>
      <Grid xs={12}>
        <DashboardBox>
          <AssetBurnedTable />
        </DashboardBox>
      </Grid>
      <Grid xs={12}>
        <BurnPieChart />
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
