'use client'
import { Grid, Typography, Paper, Divider } from '@mui/material'
import React, { type FC } from 'react'
import { leaderboardSelector } from '@/state'
import { useRecoilValueLoadable } from 'recoil'
import type { Asset } from '@/types'
import { formatAmountWithExponent, formatAssetAmount, formatTokenAmount } from '@/util'
import RankingTable from './RankingTable'
import { useChainContext } from '@/hooks'

interface Props {
  burnDenom: Asset
  mintDenom: Asset
  chainName: string
}

export const LeaderboardLayout: FC<Props> = ({ chainName, burnDenom: { id, decimals }, mintDenom }) => {
  const { address: userAddress } = useChainContext(chainName)
  const fetchLeaderboard = useRecoilValueLoadable(leaderboardSelector({ chainName, denom: id }))
  if (fetchLeaderboard.state !== 'hasValue') return <Typography>Loading...</Typography>

  const { leaderboard, totalBurnedAssets, uniqueBurners } = fetchLeaderboard.contents
  const formattedLeaderboard = leaderboard.map(([burner, totalBurn]) => ({
    id: burner,
    totalBurn
  }))

  const userRank = formattedLeaderboard.findIndex((burner) => burner.id === userAddress) + 1

  return (
    <Grid
      component={Paper}
      sx={{ gap: 3, flexDirection: 'column', display: 'flex', padding: 3 }}
    >
      <Typography sx={{ fontSize: 24 }}>Leaderboard</Typography>

      <Grid container xs={12} sx={{ background: '#18181b', padding: 3 }}>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burned</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {formatTokenAmount(Number(formatAmountWithExponent(totalBurnedAssets, decimals)))}
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burners</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {uniqueBurners}
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ paddingY: 2 }}>
          <Divider flexItem />
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">My Rank</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {userAddress !== undefined && userRank > 0 ? userRank : '-'}
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">{`My ${mintDenom.name} Tokens`}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
           {typeof userAddress === 'string' ? formatAssetAmount(mintDenom) : '-'}
          </Typography>
        </Grid>
      </Grid>
      <RankingTable data={formattedLeaderboard} decimals={decimals} />
    </Grid>
  )
}
