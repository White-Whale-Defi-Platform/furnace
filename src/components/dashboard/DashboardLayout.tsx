import { Unstable_Grid2 as Grid, Paper, styled, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { AssetBurnedTable } from './AssetBurnedTable'
import { BurnPieChart } from './BurnPieChart'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
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
      <Grid xs={12} >
        <BurnPieChart />
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
