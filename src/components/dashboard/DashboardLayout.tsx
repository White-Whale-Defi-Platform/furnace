'use client'
import {
  Unstable_Grid2 as Grid,
  Paper,
  styled,
  Typography
} from '@mui/material'
import React, { type FC } from 'react'
import { DashboardCharts, DashboardTable } from '@/components'
import { furnaceSelector } from '@/state'
import { useRecoilValueLoadable } from 'recoil'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
  const fetchFurnace = useRecoilValueLoadable(furnaceSelector)
  const furnaceData = Object.entries(fetchFurnace.valueMaybe() ?? {})

  const clients = useRecoilValue(clientsAtom)
  const fuels = useRecoilValue(fuelsSelector('osmosis'))
  const leaderboard = useRecoilValue(chainLeaderboardSelector('osmosis'))

  return (
    <Grid gap={3} container justifyContent="space-between">
      <DashboardBox>
        <Typography color="GrayText">Chains Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {furnaceData.length}
        </Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color="GrayText">Assets Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {furnaceData.map(([_, chainInfo]) => chainInfo.length)
            .reduce((x, y) => x + y, 0)}
        </Typography>
      </DashboardBox>
      <Grid xs={12}>
        <DashboardBox>
          <DashboardTable furnaceData={furnaceData} />
        </DashboardBox>
      </Grid>
      <Grid xs={12}>
        <DashboardCharts furnaceData={furnaceData} />
      </Grid>
    </Grid>
  )
}