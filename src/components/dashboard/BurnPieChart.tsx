import { Paper, Stack, styled, Typography } from '@mui/material'
import { assets } from 'chain-registry'
import React, { type FC } from 'react'
import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// This is dummy data just to build ui for now
const getAssetInfo = {
  migaloo: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'WHALE'),
      events: 428_978,
      uniques: 23_123,
      fill: '#31c259'
    },
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'GUPPY'),
      events: 768_000,
      uniques: 20_000,
      fill: '#054499'
    }
  ],
  chihuahua: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'chihuahua')
        ?.assets.find(({ symbol }) => symbol === 'HUAHUA'),
      events: 234_789,
      uniques: 30_123,
      fill: '#F0A841'
    }
  ]
}

const PieChartContainer = styled(Paper)({
  alignSelf: 'center',
  width: '100%',
  padding: 20
})

export const BurnPieChart: FC = () => {
  const assetData = Object.entries(getAssetInfo).flatMap(([chain, chainInfo]) =>
    chainInfo.map((asset) => ({ chain, name: asset.asset?.symbol, ...asset }))
  )
  return (
    <Stack spacing={3} direction={{ sm: 'column', md: 'row' }} >
          <PieChartContainer >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                pb: 3
              }}
            >
              Number of Burn Events
            </Typography>
            <ResponsiveContainer width='100%' minHeight='250px'>
              <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Tooltip
                  label={'burn events'}
                  formatter={(value) =>
                    `${new Intl.NumberFormat().format(Number(value))} burn events`}
                />
                <Pie
                  dataKey="events"
                  nameKey="name"
                  data={assetData}
                  labelLine={false}
                  innerRadius={40}
                  outerRadius={90}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} color={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </PieChartContainer>
          <PieChartContainer >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                pb: 3
              }}
            >
              Number of Unique Burners
            </Typography>
            <ResponsiveContainer width='100%' minHeight='250px'>
              <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Tooltip
                  label='burners'
                  formatter={(value) =>
                    `${new Intl.NumberFormat().format(Number(value))} burners`}
                />
                <Pie
                  dataKey="uniques"
                  nameKey="name"
                  data={assetData}
                  labelLine={false}
                  innerRadius={40}
                  outerRadius={90}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} color={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </PieChartContainer>
      </Stack>
  )
}
