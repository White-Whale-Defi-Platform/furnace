import { Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import type { FurnaceDataByChain } from '../DashboardCharts'
import { ENDPOINTS } from '@/constants'

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

interface Props {
  valueBurnedData: FurnaceDataByChain
}

export const ValueBurnedByChain: FC<Props> = ({ valueBurnedData }) => {
  const fuelChains = Object.entries(valueBurnedData)

  // An object where the keys are the token symbol and the values are the dollar value of that token that have been burned
  // e.g. { LAB: 100, OSMO: 200 }
  //   const burnedByChainData = fuelChains.map(([chainName, fuelInfos]) => {
  //     const burnedValueByDenom = fuelInfos.reduce((allFuelInfo, currentFuelInfo) => {
  //       const { asset, leaderboard } = currentFuelInfo
  //       if (currentFuelInfo != null) {
  //         return {
  //           ...allFuelInfo,
  //           name: chainName,
  //           [asset?.name]: leaderboard.totalBurnedAssets
  //         }
  //       } else {
  //         return allFuelInfo
  //       }
  //     }, {})
  //     return burnedValueByDenom
  //   }
  //   )

  // const chainBySymbol: Record<
  // string,
  // {
  //   chainName: string
  //   tokens: (typeof assetInfo)[keyof typeof assetInfo]
  //   tokenFill: string
  // }
  // > = Object.fromEntries(
  //   assetTuples.flatMap(([chainName, chainInfo]) =>
  //     chainInfo.map((asset) => [
  //       asset.asset.symbol,
  //       { chainName, tokens: chainInfo, tokenFill: asset.fill }
  //     ])
  //   )
  // )

  return (
    <>
       <ChartLabel>Value Burned Per Chain Coming Soon</ChartLabel>
          {/* <ResponsiveContainer height={400}>
            <BarChart
              data={[burnedByChainData]}
              margin={{
                top: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="chainName" />
              <YAxis
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat().format(Number(value))}`
                }
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value) =>
                  new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(value))
                }
              />
              <Legend />
              {Object.entries(burnedByChainData).map(([chainName, totalBurned]) => {
                return (
                      <Bar
                          key={`${chainName}${totalBurned}`}
                          dataKey={chainName}
                          stackId={chainName} />
                )
              })}
            </BarChart>
          </ResponsiveContainer> */}
    </>
  )
}
