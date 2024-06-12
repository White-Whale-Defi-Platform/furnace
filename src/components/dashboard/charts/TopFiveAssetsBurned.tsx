'use client'
import {
  Skeleton,
  Typography,
  styled
} from '@mui/material'
import React, { type FC } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import type { FurnaceDataByChain } from '@/components'

const ChartLabel = styled(Typography)({
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})
interface Props {
  fuelAssetData: FurnaceDataByChain
  chartLoading: boolean
}

export const TopFiveAssetsBurned: FC<Props> = ({
  fuelAssetData,
  chartLoading
}) => {
  const scatterChartData = Object.entries(fuelAssetData)
    .flatMap(([chainName, assetInfos]) =>
      assetInfos.map(({ asset, leaderboard }) => ({
        name: asset?.burnAsset.name,
        burners: leaderboard.uniqueBurners,
        logo: asset?.burnAsset.logo,
        chain: chainName
      }))
    )

  console.log(scatterChartData, 'scatterChartData')
  return (
    <>
      <ChartLabel>Burnes per Asset</ChartLabel>
      {chartLoading
        ? (
        <Skeleton variant="rectangular" height={400} />
          )
        : (
        <BarChart
        // tooltip={{ trigger: 'axis' }}
        dataset={scatterChartData}
        yAxis={[
          {
            dataKey: 'name',
            disableTicks: true
          }
        ]}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'name',
            tickMinStep: 1,
            tickMaxStep: 1
          }
        ]}
        series={[
          {
            dataKey: 'burners',
            label: 'assets'
          }
        ]}
        grid={{ vertical: true }}
        height={300}
        margin={{ top: 50, right: 10, bottom: 20, left: 40 }}
        slotProps={{ legend: { hidden: true } }}
      />
          )}
    </>
  )
}
