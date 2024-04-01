import { Padding } from '@mui/icons-material'
import { Container, Grid, Paper, Typography } from '@mui/material'
import React, { type FC } from 'react'

const Dashboard: FC = () => {
  return (
    <Grid container spacing={2} >
      {/* Table goes here */}
      <Grid xs={12} item>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240
          }}
        >
            <Typography>Aggregated information in Table</Typography>
            <Typography>How many furnaces/chains/assets are there?</Typography>
        </Paper>
      </Grid>
      {/* Pie chart goes here */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography>pie chart goes here</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default Dashboard
