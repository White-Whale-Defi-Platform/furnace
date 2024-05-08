'use client'
import { Box, Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import {
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Label,
  Legend,
  ZAxis
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
  uniqueBurnerAndAssets: FurnaceDataByChain
}

export const UniqueBurnersAndAsset: FC<Props> = ({ uniqueBurnerAndAssets }) => {
  const scatterData = Object.entries(uniqueBurnerAndAssets).map(
    ([chainName, assetInfos]) => {
      const leaderboards = new Set(
        assetInfos.flatMap(({ leaderboard: { leaderboard } }) =>
          leaderboard.map(([address, _]) => address)
        )
      ).size

      return {
        chainName,
        uniqueBurners: leaderboards,
        numberOfAssets: assetInfos.length
      }
    }
  )

  const CustomTooltip = ({
    active,
    payload
  }: {
    active: boolean
    payload: Array<{
      dataKey: string
      name: string
      payload: {
        chainName: string
        uniqueBurners: number
        numberOfAssets: number
      }
    }>
  }) => {
    if (active && payload.length > 0) {
      const { chainName, uniqueBurners, numberOfAssets } = payload[0].payload
      return (
        <Box sx={{ padding: 2, background: 'white' }}>
          <Typography color="CaptionText">{`${formatPrettyName(
            chainName
          )}`}</Typography>
          <Typography color="CaptionText">{`Number of Unique Burners: ${uniqueBurners}`}</Typography>
          <Typography color="CaptionText">{`Number of Assets: ${numberOfAssets}`}</Typography>
        </Box>
      )
    }
  }

  return (
    <>
      <ChartLabel paddingBottom="2px">
        Number of Unique Burners vs Assets Per Chain
      </ChartLabel>
      <ResponsiveContainer height={400}>
        <ScatterChart
          data={scatterData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis allowDecimals={false} type="number" dataKey="numberOfAssets">
            <Label position="bottom" value={'Number of Assets'} />
          </XAxis>

          <YAxis allowDecimals={false} type="number" dataKey="uniqueBurners">
            <Label
              dy={-170}
              dx={-250}
              transform="rotate(-90)"
              value={'Number of Unique Burners'}
            />
          </YAxis>
          <ZAxis range={[250, 251]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            labelStyle={{ color: 'ActiveBorder' }}
            content={<CustomTooltip />}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ top: 0, paddingBottom: '1px' }}
          />
          {scatterData.map((chartInfo) => (
            <Scatter
              key={chartInfo.chainName}
              name={chartInfo.chainName}
              data={[chartInfo]}
              fill={ENDPOINTS[chartInfo.chainName].chainColor}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}
