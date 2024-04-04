import { Unstable_Grid2 as Grid, Paper, styled, Typography } from '@mui/material'
import React, { type FC } from 'react'

const DashboardPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

const DashboardLayout: FC = () => {
  return (
    <Grid gap={3} container justifyContent="space-between">
      <DashboardPaper>
        <Typography color='GrayText'>
          Total Tokens Burned
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>1000,000,000</Typography>
      </DashboardPaper>
      <DashboardPaper>
        <Typography color='GrayText'>
          Chains Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >1</Typography>
      </DashboardPaper>
      <DashboardPaper>
        <Typography color='GrayText'>
          Assets Supported
        </Typography>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >2</Typography>
      </DashboardPaper>

      <Grid xs={12}>
        <DashboardPaper>
          <Typography>Table goes here</Typography>
        </DashboardPaper>
      </Grid>
      <Grid xs={12} spacing={3} container direction="row">
        <Grid xs={12} sm={6} justifyContent="space-between">
          <DashboardPaper>
            <Typography>Pie chart 1 goes here</Typography>
          </DashboardPaper>
        </Grid>
        <Grid xs={12} sm={6}>
          <DashboardPaper>
            <Typography>Pie chart 2 goes here</Typography>
          </DashboardPaper>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
