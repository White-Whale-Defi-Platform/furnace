'use client'
import { Unstable_Grid2 as Grid, Paper } from '@mui/material'
import React, { type FC } from 'react'
import {
  NumberOfFuelAssets,
  NumberOfUniqueBurners,
  UniqueBurnersAndAsset,
  TopFiveAssetsBurned
} from './charts'
import type { ChainName } from '@/constants'
import type { TotalFurnaceData } from '@/state'

export type FurnaceDataByChain = Record<string, Array<TotalFurnaceData[1]>>
interface Props {
  furnaceData: Array<[ChainName, Array<TotalFurnaceData[1]>]>
  chartLoading: boolean
}
export const DashboardCharts: FC<Props> = ({ furnaceData, chartLoading }) => {
  const formattedChartData: FurnaceDataByChain =
    furnaceData.reduce<FurnaceDataByChain>(
      (allFurnaceData, currentFurnaceData): FurnaceDataByChain => {
        const [chainName, fuelInfo] = currentFurnaceData
        return {
          ...allFurnaceData,
          [chainName]:
            chainName in allFurnaceData
              ? [...allFurnaceData[chainName], ...fuelInfo]
              : fuelInfo
        }
      },
      {}
    )
  return (
    <Grid container spacing={3}>
      <Grid xs={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <NumberOfFuelAssets fuelAssetData={formattedChartData} chartLoading={chartLoading} />
        </Paper>
      </Grid>
      <Grid xs={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <TopFiveAssetsBurned fuelAssetData={formattedChartData} chartLoading={chartLoading} />
        </Paper>
      </Grid>
      <Grid xs={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <NumberOfUniqueBurners uniqueBurnersData={formattedChartData} chartLoading={chartLoading} />
        </Paper>
      </Grid>
      <Grid xs={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <UniqueBurnersAndAsset uniqueBurnerAndAssets={formattedChartData} chartLoading={chartLoading} />
        </Paper>
      </Grid>
    </Grid>
  )
}
