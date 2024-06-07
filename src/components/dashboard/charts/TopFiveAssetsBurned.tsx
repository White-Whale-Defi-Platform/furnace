'use client'
import { Avatar, Box, Skeleton, Stack, Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  Cell
} from 'recharts'
import { ENDPOINTS } from '@/constants'
import { formatPrettyName } from '@/util'
import type { FurnaceDataByChain } from '@/components'

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})
interface Props {
  fuelAssetData: FurnaceDataByChain
  chartLoading: boolean
}

export const TopFiveAssetsBurned: FC<Props> = ({ fuelAssetData, chartLoading }) => {
  const scatterChartData = Object.entries(fuelAssetData)
    .flatMap(([chainName, assetInfos]) =>
      assetInfos.map(({ asset, leaderboard }) => ({
        name: asset?.burnAsset.name,
        burners: leaderboard.uniqueBurners,
        logo: asset?.burnAsset.logo,
        chain: chainName
      }))
    )
    .sort((a, b) => b.burners - a.burners)
    .slice(0, 5)

  const CustomTooltip = ({
    active,
    payload
  }: {
    active: boolean
    payload: Array<{
      dataKey: string
      name: string
      payload: { name: string, burners: number, logo: string }
    }>
  }) => {
    if (active && payload.length > 0) {
      const { name, burners, logo } = payload[0].payload
      return (
        <Box sx={{ padding: 2, background: 'white' }}>
          <Stack direction="row" gap={1}>
            <Avatar
              alt={`${name} Logo`}
              sx={{ width: 24, height: 24 }}
              src={logo}
            />
            <Typography color="CaptionText">{`${formatPrettyName(
              name
            )}: ${burners} burners`}</Typography>
          </Stack>
        </Box>
      )
    }
  }

  return (
    <>
      <ChartLabel>Top 5 Assets Burned by Users</ChartLabel>
      {chartLoading
        ? (
        <Skeleton variant="rectangular" height={400} />
          )
        : (
      <ResponsiveContainer height={400}>
        <BarChart
          data={scatterChartData}
          layout="vertical"
          margin={{
            top: 20,
            bottom: 5
          }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" width={150} dataKey="name">
            <Label />
          </YAxis>
          <Tooltip
            cursor={{ fill: 'transparent' }}
            labelStyle={{ color: 'ActiveBorder' }}
            content={<CustomTooltip />}
          />

          <Bar dataKey="burners">
            {scatterChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ENDPOINTS[entry.chain].chainColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
          )}
    </>
  )
}
