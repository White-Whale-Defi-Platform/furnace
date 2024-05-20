import { Box, Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from 'recharts'
import { ENDPOINTS } from '@/constants'
import type { FurnaceDataByChain } from '../DashboardCharts'
import { formatPrettyName } from '@/util'

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

interface Props {
  uniqueBurnersData: FurnaceDataByChain
}
export const NumberOfUniqueBurners: FC<Props> = ({ uniqueBurnersData }) => {
  // Reduce down each chain and its fuel assets' leaderboard to calculate the unique number of burners
  // e.g. a address who burned Whale and Guppy in Migaloo should be 1 unique address not 2
  // Keyed by chain name and value being number of unique burners
  const numberOfUniqueBurners = Object.entries(uniqueBurnersData).map(
    ([chainName, assets]) => {
      // The Set checks the each unique address in the leaderboard
      const leaderboards = new Set(
        assets.flatMap(({ leaderboard: { leaderboard } }) =>
          leaderboard.map(([address, _]) => address)
        )
      ).size

      return {
        name: chainName,
        burners: leaderboards
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
      payload: { name: string, burners: number }
    }>
  }) => {
    if (active && payload.length > 0) {
      const { name, burners } = payload[0].payload
      return (
        <Box sx={{ padding: 2, background: 'white' }}>
          <Typography color="CaptionText">{`${formatPrettyName(
            name
          )}: ${burners} burners`}</Typography>
        </Box>
      )
    }
  }

  return (
    <>
      <ChartLabel>Number of Unique Burners by Chains</ChartLabel>
      <ResponsiveContainer height={400}>
        <BarChart
          data={numberOfUniqueBurners}
          margin={{
            top: 20,
            bottom: 5
          }}
        >
          <CartesianGrid />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat().format(Number(value))
            }
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            formatter={(value) =>
              `${new Intl.NumberFormat().format(Number(value))} burners`
            }
            content={<CustomTooltip />}
          />
          <Legend
            payload={numberOfUniqueBurners.map((item, index) => ({
              id: `${item.name}-${index}`,
              type: 'circle',
              value: `${item.name}`,
              color: ENDPOINTS[item.name].chainColor
            }))}
          />
          <Bar dataKey="burners">
            {numberOfUniqueBurners.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ENDPOINTS[entry.name].chainColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
