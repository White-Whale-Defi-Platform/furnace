'use client'
import { Skeleton, Typography, styled } from '@mui/material'
import React, { type FC } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import type { FurnaceDataByChain } from '@/components'
import { ChartColors } from '@/util'

const ChartLabel = styled(Typography)({
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5,
})

interface Props {
  uniqueBurnersData: FurnaceDataByChain
  chartLoading: boolean
}
export const BurnersPerChain: FC<Props> = ({
  uniqueBurnersData,
  chartLoading,
}) => {
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
        burners: leaderboards,
      }
    }
  )
  return (
    <>
      <ChartLabel>Burners per Chain</ChartLabel>
      {chartLoading
        ? (
          <Skeleton variant="rectangular" height={400} />
          )
        : (
          <BarChart
            tooltip={{ trigger: 'axis' }}
            dataset={numberOfUniqueBurners}
            yAxis={[
              {
                scaleType: 'band',
                dataKey: 'name',
                colorMap: {
                  type: 'ordinal',
                  colors: ChartColors,
                },
              },
            ]}
            series={[
              {
                dataKey: 'burners',
                label: 'burners',
              },
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
