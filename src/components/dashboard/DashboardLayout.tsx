import { Unstable_Grid2 as Grid, Paper, Typography } from '@mui/material'
import React, { type FC } from 'react'
import AssetBurnedTable from './AssetBurnedTable'

const DashboardLayout: FC = () => {
  return (
    <Grid gap={3} container justifyContent="space-between">
      <Paper
        sx={{
          p: 4,
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          gap: 2,
          alignContent: 'center'
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}
        >
          Total Tokens Burned
        </Typography>
        <Typography>1000,000,000</Typography>
      </Paper>
      <Paper
        sx={{
          p: 4,
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          gap: 2,
          alignContent: 'center'
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}
        >
          Chains Supported
        </Typography>
        <Typography>1</Typography>
      </Paper>
      <Paper
        sx={{
          p: 4,
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          gap: 2,
          alignContent: 'center'
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}
        >
          Assets Supported
        </Typography>
        <Typography>2</Typography>
      </Paper>
      <Grid xs={12}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignContent: 'center'
          }}
        >
          <AssetBurnedTable />
        </Paper>
      </Grid>
      <Grid xs={12} spacing={3} container direction="row">
        <Grid xs={12} sm={6} justifyContent="space-between">
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              gap: 2,
              alignContent: 'center'
            }}
          >
            <Typography>Pie chart 1 goes here</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              gap: 2,
              alignContent: 'center'
            }}
          >
            <Typography>Pie chart 2 goes here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
