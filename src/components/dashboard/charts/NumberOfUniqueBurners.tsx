import { Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from 'recharts'
import { ENDPOINTS } from '@/constants'
import type { FurnaceDataByChain } from '../DashboardCharts'

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
  const numberOfUniqueBurners = Object.fromEntries(
    Object.entries(uniqueBurnersData).map(([chainName, asset]) => {
      // The Set checks the each unique address in the leaderboard
      const leaderboards = new Set(asset
        .flatMap(({ leaderboard: { leaderboard } }) =>
          leaderboard.map(([address, _]) => address)
        )).size
      return [chainName, leaderboards]
    })
  )

  return (
    <>
      <ChartLabel>Number of Unique Burners by Chains</ChartLabel>
      <ResponsiveContainer height={400}>
        <BarChart
          data={[numberOfUniqueBurners]}
          margin={{
            top: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
          />
          <Legend />
         {Object.keys(ENDPOINTS).map((chainName) => (
            <Bar
              key={`${chainName}`}
              dataKey={chainName}
              fill={ENDPOINTS[chainName].chainColor}
            />
         ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
