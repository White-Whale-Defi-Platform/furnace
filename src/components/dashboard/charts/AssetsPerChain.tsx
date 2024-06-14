'use client'
import type { FurnaceDataByChain } from '@/components'
import { Skeleton, styled, Typography } from '@mui/material'
import React, { type FC } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { ChartColors } from '@/util'

const ChartLabel = styled(Typography)({
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

interface Props {
  fuelAssetData: FurnaceDataByChain
  chartLoading: boolean
}

export const AssetsPerChain: FC<Props> = ({
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
  return (
    <>
      <ChartLabel>Assets per Chain</ChartLabel>
      {chartLoading
        ? (
        <Skeleton variant="rectangular" height={400} />
          )
        : (
        <BarChart
          tooltip={{ trigger: 'axis' }}
          dataset={fuelAssets}
          yAxis={[
            {
              scaleType: 'band',
              dataKey: 'name',
              colorMap: {
                type: 'ordinal',
                colors: ChartColors
              }
            }
          ]}
          xAxis={[
            {
              max: Math.max(10, ...fuelAssets.map(({ length }) => length + 1)),
              tickMinStep: 1,
              tickMaxStep: 1
            }
          ]}
          series={[
            {
              dataKey: 'length',
              label: 'assets'
            }
          ]}
          layout="horizontal"
          grid={{ vertical: true }}
          height={300}
          margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
          slotProps={{ legend: { hidden: true } }}
        />
          )}
    </>
  )
}
