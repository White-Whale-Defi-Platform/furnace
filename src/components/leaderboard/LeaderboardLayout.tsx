'use client'
import { Unstable_Grid2 as Grid, Typography, Paper, Divider, Skeleton } from '@mui/material'
import React, { type FC } from 'react'
import { leaderboardSelector } from '@/state'
import { useRecoilValueLoadable } from 'recoil'
import type { Asset } from '@/types'
import { formatAmountWithExponent, formatAssetAmount, formatTokenAmount } from '@/util'
import { RankingTable } from '@/components'
import { useChainContext } from '@/hooks'
interface Props {
  burnDenom: Asset
  mintDenom: Asset
  chainName: string
}

export const LeaderboardLayout: FC<Props> = ({ chainName, burnDenom: { id, decimals }, mintDenom }) => {
  const userAddress = useChainContext(chainName).data?.bech32Address
  const fetchLeaderboard = useRecoilValueLoadable(leaderboardSelector({ chainName, denom: id }))

  const { leaderboard, totalBurnedAssets, uniqueBurners } = (fetchLeaderboard.valueMaybe()) ?? {
    uniqueBurners: 0,
    totalBurnedAssets: 0,
    avgTokensBurnedPerUniques: 0,
    leaderboard: []
  }
  const formattedLeaderboard = leaderboard.map(([burner, totalBurn]) => ({
    id: burner,
    totalBurn
  }))

  const userRank = formattedLeaderboard.findIndex((burner) => burner.id === userAddress) + 1
  return (
    <Grid
      container
      component={Paper}
      sx={{ gap: 3, flexDirection: 'column', padding: 3, bgcolor: '#2B2626', minWidth: '70vw' }}
    >
      <Typography sx={{ fontSize: 24 }}>Leaderboard</Typography>

      <Grid container xs={12} sx={{ background: '#10131A', padding: 3 }}>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography>Total Burned</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {!(fetchLeaderboard.state !== 'hasValue' && totalBurnedAssets === 0) ? formatTokenAmount(Number(formatAmountWithExponent(totalBurnedAssets, decimals))) : <Skeleton width={180} /> }
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography>Total Burners</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {!(fetchLeaderboard.state !== 'hasValue' && totalBurnedAssets === 0) ? uniqueBurners : <Skeleton width={180} /> }
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ paddingY: 2 }}>
          <Divider flexItem />
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography>My Rank</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {(typeof userAddress === 'string' && fetchLeaderboard.state === 'hasValue' && userRank >= 0) ? userRank : <Skeleton width={180}/> }
          </Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography>{`My ${mintDenom.name} Tokens`}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
           {typeof userAddress === 'string' && fetchLeaderboard.state === 'hasValue' && totalBurnedAssets !== 0 ? formatAssetAmount(mintDenom) : <Skeleton width={180} /> }
          </Typography>
        </Grid>
      </Grid>
      <RankingTable data={formattedLeaderboard} decimals={decimals} />
    </Grid>
  )
}
