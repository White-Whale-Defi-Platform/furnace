'use client'
import type { FurnaceDataByChain } from '@/components'
import { ENDPOINTS } from '@/constants'
import { Box, Skeleton, styled, Typography } from '@mui/material'
import React, { type FC } from 'react'
import {
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from 'recharts'
import { formatPrettyName, formatTokenAmount } from '@/util'

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

export const NumberOfFuelAssets: FC<Props> = ({
  fuelAssetData,
  chartLoading
}) => {
  // keyed by chain name and value being number of fuel assets
  const fuelAssets = Object.entries(fuelAssetData).map(
    ([chainName, assetInfos]) => ({
      name: chainName,
      length: assetInfos.length
    })
  )
  const CustomTooltip = ({
    active,
    payload
  }: {
    active: boolean
    payload: Array<{
      dataKey: string
      name: string
      payload: { name: string, length: number }
    }>
  }) => {
    if (active && payload.length > 0) {
      const { name, length } = payload[0].payload
      return (
        <Box sx={{ padding: 2, background: 'white' }}>
          <Typography color="CaptionText">{`${formatPrettyName(
            name
          )}: ${length}`}</Typography>
        </Box>
      )
    }
  }
  return (
    <>
      <ChartLabel>Number of Fuel Assets Per Chain</ChartLabel>
      {chartLoading
        ? (
        <Skeleton variant="rectangular" height={400} />
          )
        : (
        <ResponsiveContainer height={400}>
          <BarChart
            data={fuelAssets}
            margin={{
              top: 20,
              bottom: 5
            }}
          >
            <CartesianGrid />
            <YAxis
              allowDecimals={false}
              tickFormatter={(value) => formatTokenAmount(Number(value))}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              labelStyle={{ color: 'ActiveBorder' }}
              content={<CustomTooltip active={false} payload={[]} />}
            />
            <Legend
              payload={fuelAssets.map((item, index) => ({
                id: `${item.name}-${index}`,
                type: 'circle',
                value: `${item.name}`,
                color: ENDPOINTS[item.name].chainColor
              }))}
            />
            <Bar dataKey="length">
              {fuelAssets.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={ENDPOINTS[entry.name].chainColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
          )}
    </>
  )
}
