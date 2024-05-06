'use client'
import { Grid, Typography, Paper, Divider } from '@mui/material'
import React, { type FC } from 'react'
import RankingTable from './RankingTable'
import { leaderboardSelector } from '@/state'
import { useRecoilValue } from 'recoil'
import type { Asset } from '@/types'

interface Props {
  burnDenom: Asset
  chainName: string
}

export const LeaderboardLayout: FC<Props> = ({ chainName, burnDenom }) => {
  const formatData = (data: number): string =>
    new Intl.NumberFormat().format(data)

  const leaderboard = useRecoilValue(leaderboardSelector({ chainName, denom: burnDenom.id }))

  console.log(leaderboard)
  return (
    <Grid
      component={Paper}
      sx={{ gap: 3, flexDirection: 'column', display: 'flex', padding: 3 }}
    >
      <Typography sx={{ fontSize: 30 }}>Leaderboard</Typography>

      <Grid container xs={12} sx={{ background: '#18181b', padding: 3 }}>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burned</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {formatData(29_691_404_419)}
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burners</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {formatData(29_691_404_419)}
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ paddingY: 2 }}>
          <Divider flexItem />
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">My Rank</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {formatData(404_419)}
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">{`My ${burnDenom.name} Tokens`}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {formatData(404_419)}
          </Typography>
        </Grid>
      </Grid>
      {/* <RankingTable data={tableData} /> */}
    </Grid>
  )
}

export default LeaderboardLayout
