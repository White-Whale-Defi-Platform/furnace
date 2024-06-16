'use client'
import { Unstable_Grid2 as Grid, Typography, Paper, Divider } from '@mui/material'
import type { FC } from 'react'

export const LeaderboardLoading: FC = () => {
  return (
    <Grid
    component={Paper}
    sx={{ gap: 3, flexDirection: 'column', display: 'flex', padding: 3, bgcolor: '#131D33' }}
  >
    <Typography sx={{ fontSize: 24 }}>Leaderboard</Typography>

    <Grid container xs={12} sx={{ background: '#131D33', padding: 3 }}>
      <Grid xs={6} flexGrow={1} gap={3}>
        <Typography>Total Burned</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}/>
      </Grid>
      <Grid xs={6} flexGrow={1} gap={3}>
        <Typography>Total Burners</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}/>
      </Grid>
      <Grid xs={12} sx={{ paddingY: 2 }}>
        <Divider flexItem />
      </Grid>
      <Grid xs={6} flexGrow={1} gap={3}>
        <Typography>My Rank</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}/>
      </Grid>
      <Grid xs={6} flexGrow={1} gap={3}>
        <Typography>{'My Tokens'}</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}/>
      </Grid>
    </Grid>
  </Grid>
  )
}

export default LeaderboardLoading
