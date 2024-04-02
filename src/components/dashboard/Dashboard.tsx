import { Grid, Paper, Typography } from '@mui/material'
import React, { type FC } from 'react'

const Dashboard: FC = () => {
  return (
    <Grid gap={3} container justifyContent='space-between'>
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
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}>Total Tokens Burned</Typography>
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
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}>Chains Supported</Typography>
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
        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'lightslategray' }}>Assets Supported</Typography>
        <Typography>2</Typography>
    </Paper>
    </Grid>
  )
}
export default Dashboard
