import { ENDPOINTS } from '@/constants'
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
const assetInfo = {
  migaloo: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'WHALE'),
      totalBurned: 828_978,
      uniques: 23_123,
      fill: '#31c259',
      tokenPrice: 0.03
    },
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'GUPPY'),
      totalBurned: 21_768_000,
      uniques: 20_000,
      fill: '#054499',
      tokenPrice: 0.002
    }
  ],
  chihuahua: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'chihuahua')
        ?.assets.find(({ symbol }) => symbol === 'HUAHUA'),
      totalBurned: 30_234_789,
      uniques: 30_123,
      tokenPrice: 0.0003,
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
  const assetData = Object.entries(assetInfo).flatMap(([chain, chainInfo]) =>
    chainInfo.map((asset) => ({ chain, name: asset.asset?.symbol, ...asset, avgBurnedPerUnique: asset.totalBurned / asset.uniques * asset.tokenPrice }))
  )
  const uniqueChainBurners = Object.entries(assetInfo)
    .map(([chain, furnaceAssets]) => ({
      label: chain,
      fill: ENDPOINTS[chain].chainColor,
      value: furnaceAssets.map(({ uniques }) => uniques).reduce((initial, accum) => initial + accum, 0)
    }))
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
              Number of Unique Burners by Chains
            </Typography>
            <ResponsiveContainer width='100%' minHeight='250px'>
              <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Tooltip
                  label={'unique burners by chains'}
                  formatter={(value) =>
                    `${new Intl.NumberFormat().format(Number(value))} burners`}
                />
                <Pie
                  dataKey="value"
                  nameKey="label"
                  data={uniqueChainBurners}
                  labelLine={false}
                  innerRadius={40}
                  outerRadius={90}
                >
                  {uniqueChainBurners.map((entry, index) => (
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
              Avg Value Burned Per User
            </Typography>
            <ResponsiveContainer width='100%' minHeight='250px'>
              <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Tooltip
                  label='avg value burned per user'
                  formatter={(value) =>
                    `$${new Intl.NumberFormat().format(Number(value))}/user`}
                />
                <Pie
                  dataKey="avgBurnedPerUnique"
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
