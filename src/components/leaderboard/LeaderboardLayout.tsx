import { Grid, Typography, Paper, Divider } from '@mui/material'
import React, { type FC } from 'react'
import DetailsField from './DetailsField'
import DetailsDisplay from './DetailsDisplay'
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

export const LeaderboardLayout: FC = () => {
  const formatData = (data: number): string => new Intl.NumberFormat().format(data)
  return (
    <Grid component={Paper} sx={{ gap: 3, flexDirection: 'column', display: 'flex', padding: 3 }}>
      <Typography sx={{ fontSize: 30 }} >
          Leaderboard
      </Typography>
       <DetailsDisplay>
        <DetailsField label={'Total Burned'} data={formatData(29_691_404_419)} />
        <DetailsField label={'Community Burn'} data={formatData(1_540_358_394)} />
        <DetailsField label={'Foundation Burn'} data={formatData(28_151_000)} />
          <Grid xs={12} sx={{ paddingY: 2 }}><Divider flexItem /></Grid>
        <DetailsField label={'Total Burners'} data={formatData(29_691_404_419)} />
        <DetailsField label={'My Rank'} data={formatData(1_540_358_394)} />
        <DetailsField label={'My Ash Tokens'} data={formatData(28_151_000)} />
       </DetailsDisplay>
       <RankingTable data={tableData} />
    </Grid>

  )
}

export default LeaderboardLayout
