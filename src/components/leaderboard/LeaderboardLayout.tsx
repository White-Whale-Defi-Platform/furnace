'use client'
import { Grid, Typography, Paper, Divider } from '@mui/material'
import React, { type FC } from 'react'
import RankingTable from './RankingTable'

const tableData = [{
  id: 'EC',
  totalBurn: '234223424'
},
{
  id: 'Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo12emutgfv7hy46khk5x36e9fczuvk9ktpv3lecj',
  totalBurn: '234223424'
}, {
  id: 'juno12emutgfv7hy46khk5x36e9fczuvk9ktphh4c2q',
  totalBurn: '234223424'
},
{
  id: '123s 234Protocol',
  totalBurn: '101352.982'
},
{
  id: '2342unaVShape',
  totalBurn: '52125.000'
},
{
  id: '543migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '2423423EC',
  totalBurn: '234223424'
},
{
  id: '4242Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'sdfsLunaVShape',
  totalBurn: '52125.000'
},
{
  id: '342migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'fsfEC',
  totalBurn: '234223424'
},
{
  id: 'sfsfs5Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: '4234LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '4dsvsEC',
  totalBurn: '234223424'
},
{
  id: 'jk,hEris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'hkLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'jljEC',
  totalBurn: '234223424'
},
{
  id: '79Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'jklLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'kl8migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'EC',
  totalBurn: '234223424'
},
{
  id: 'Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'E34C',
  totalBurn: '234223424'
},
{
  id: '123s 234Protocol',
  totalBurn: '101352.982'
},
{
  id: '2342unaVShape',
  totalBurn: '52125.000'
},
{
  id: '543migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '2423423EC',
  totalBurn: '234223424'
},
{
  id: '4242Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'sdfsLunaVShape',
  totalBurn: '52125.000'
},
{
  id: '342migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'fsfEC',
  totalBurn: '234223424'
},
{
  id: 'sfsfs5Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: '4234LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '4dsvsEC',
  totalBurn: '234223424'
},
{
  id: 'jk,hEris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'hkLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'jljEC',
  totalBurn: '234223424'
},
{
  id: '79Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'jklLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'kl8migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'EC',
  totalBurn: '234223424'
},
{
  id: 'Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'E34C',
  totalBurn: '234223424'
},
{
  id: '123s 234Protocol',
  totalBurn: '101352.982'
},
{
  id: '2342unaVShape',
  totalBurn: '52125.000'
},
{
  id: '543migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '2423423EC',
  totalBurn: '234223424'
},
{
  id: '4242Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'sdfsLunaVShape',
  totalBurn: '52125.000'
},
{
  id: '342migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'fsfEC',
  totalBurn: '234223424'
},
{
  id: 'sfsfs5Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: '4234LunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: '4dsvsEC',
  totalBurn: '234223424'
},
{
  id: 'jk,hEris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'hkLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}, {
  id: 'jljEC',
  totalBurn: '234223424'
},
{
  id: '79Eris Protocol',
  totalBurn: '101352.982'
},
{
  id: 'jklLunaVShape',
  totalBurn: '52125.000'
},
{
  id: 'kl8migaloo134243sdfdfsfsfsfsfzp9aqt4n',
  totalBurn: '234223424'
}]

interface Props {
  mintDenom: string
}

export const LeaderboardLayout: FC<Props> = ({ mintDenom }) => {
  const formatData = (data: number): string => new Intl.NumberFormat().format(data)
  return (
    <Grid component={Paper} sx={{ gap: 3, flexDirection: 'column', display: 'flex', padding: 3 }}>
      <Typography sx={{ fontSize: 30 }} >
          Leaderboard
      </Typography>
      <Grid container xs={12} sx={{ background: '#18181b', padding: 3 }}>
      <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burned</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{formatData(29_691_404_419)}</Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">Total Burners</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{formatData(29_691_404_419)}</Typography>
        </Grid>
        <Grid xs={12} sx={{ paddingY: 2 }}><Divider flexItem /></Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">My Rank</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{formatData(404_419)}</Typography>
        </Grid>
        <Grid xs={6} flexGrow={1} gap={3}>
          <Typography color="GrayText">{`My ${mintDenom} Tokens`}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{formatData(404_419)}</Typography>
        </Grid>

      </Grid>

       <RankingTable data={tableData} />
    </Grid>

  )
}

export default LeaderboardLayout
