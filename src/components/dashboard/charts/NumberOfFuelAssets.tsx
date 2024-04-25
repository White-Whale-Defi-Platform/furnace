import type { FurnaceDataByChain } from '@/components'
import { ENDPOINTS } from '@/constants'
import { styled, Typography } from '@mui/material'
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

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

interface Props {
  fuelAssetData: FurnaceDataByChain
}

export const NumberOfFuelAssets: FC<Props> = ({ fuelAssetData }) => {
  const fuelChains = Object.entries(fuelAssetData)
  // keyed by chain name and value being number of fuel assets
  const numberOfFuelAssetsData = Object.fromEntries(
    fuelChains.map(([chainName, assetInfos]) => [chainName, assetInfos.length])
  )
  return (
    <>
      <ChartLabel>Number of Fuel Assets Per Chain</ChartLabel>
      <ResponsiveContainer height={400}>
        <BarChart
          data={[numberOfFuelAssetsData]}
          margin={{
            top: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            allowDecimals={false}
            tickFormatter={(value) =>
              new Intl.NumberFormat().format(Number(value))
            }
          />

          <Tooltip
            cursor={{ fill: 'transparent' }}
            labelStyle={{ color: 'ActiveBorder' }}
          />
          <Legend />
          {fuelChains.map(([chainName]) => (
            <Bar
              key={chainName}
              dataKey={chainName}
              fill={ENDPOINTS[chainName].chainColor}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
