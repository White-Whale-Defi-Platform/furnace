import { Typography, styled, Box } from '@mui/material'
import React, { type FC } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { FurnaceDataByChain } from '../DashboardCharts'

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})
interface Props {
  fuelAssetData: FurnaceDataByChain
}

export const AvgValueBurned: FC<Props> = ({ fuelAssetData }) => {
  const fuelChains = Object.entries(fuelAssetData)
  // keyed by chain name and value being number of fuel assets
  const numberOfFuelAssetsData = Object.fromEntries(
    fuelChains.map(([chainName, assetInfos]) => [chainName, assetInfos.length])
  )
  return (
    <>
       <ChartLabel>Average Value Burned Per User</ChartLabel>
          <ResponsiveContainer height={400}>
            <Typography> Coming Soon</Typography>
            {/* <PieChart>
              <Legend verticalAlign="bottom" height={50} />
              <Tooltip
                formatter={(value) =>
                  `${new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(value))}/user`
                }
              />
              <Pie
                dataKey="avgValueBurnedPerUnique"
                nameKey="symbol"
                data={[numberOfFuelAssetsData]}
                labelLine={false}
                innerRadius={40}
                outerRadius={130}
              >
                {fuelChains.map((entry, index) => (
                  <Cell key={`cell-${index}`} color={entry.fill} />
                ))}
              </Pie>
            </PieChart> */}
          </ResponsiveContainer>
    </>
  )
}
