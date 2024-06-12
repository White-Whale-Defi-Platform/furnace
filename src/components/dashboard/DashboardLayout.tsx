'use client'
import {
  Unstable_Grid2 as Grid,
  Paper,
  Skeleton,
  Stack,
  styled,
  Typography
} from '@mui/material'
import React, { type FC } from 'react'
import {
  DashboardCharts,
  DashboardTable,
  type FurnaceDataByChain,
  TopFiveAssetsBurned
} from '@/components'
import { furnaceSelector } from '@/state'
import { useRecoilValueLoadable } from 'recoil'
import { ENDPOINTS } from '@/constants'
import { MonetizationOnOutlined, Link } from '@mui/icons-material'

const DashboardBox = styled(Paper)({
  paddingX: 2,
  paddingY: 5
})

export const DashboardLayout: FC = () => {
  const allFurnaceData = useRecoilValueLoadable(furnaceSelector)
  const isLoading = allFurnaceData.state === 'loading'
  const furnaceData = Object.entries(allFurnaceData.valueMaybe() ?? isLoading)
  const loading = isLoading || furnaceData.length === 0
  const burnesPerAsset = furnaceData.reduce<FurnaceDataByChain>(
    (allchartData, currentFurnaceData): FurnaceDataByChain => {
      const [chainName, fuelInfo] = currentFurnaceData
      return {
        ...allchartData,
        [chainName]:
          chainName in allchartData
            ? [...allchartData[chainName], ...fuelInfo]
            : fuelInfo
      }
    },
    {}
  )
  return (
    <Grid gap={3} xl={9} alignSelf="center" justifyContent="center" container>
      <Grid container xs={12} spacing={3}>
        <Grid container xs={3} direction={'column'} justifyContent={'space-between'} spacing={3}>
          <DashboardBox>
            <Stack direction={'row'} padding={2} spacing={2}>
              <Link sx={{ alignSelf: 'center', fontSize: '50px' }} />
              <Stack spacing={1} direction="column" alignItems="start">
                <Typography>Total Chains</Typography>
                <Typography sx={{ fontSize: 35 }}>
                  {Object.keys(ENDPOINTS).length}
                </Typography>
              </Stack>
            </Stack>
          </DashboardBox>

          <DashboardBox>
            <Stack direction={'row'} padding={2} spacing={2}>
              <MonetizationOnOutlined
                sx={{ alignSelf: 'center', fontSize: '50px' }}
              />
              <Stack>
                <Typography>Total Assets</Typography>
                <Typography sx={{ fontSize: 35 }}>
                  {loading
                    ? (
                    <Skeleton width={100} />
                      )
                    : (
                        furnaceData
                          .map(([_, chainInfo]) => chainInfo.length)
                          .reduce((x, y) => x + y, 0)
                      )}
                </Typography>
              </Stack>
            </Stack>
          </DashboardBox>
        </Grid>

        <Grid xs={9}>
          <Paper sx={{ p: 2 }}>
            <TopFiveAssetsBurned
              fuelAssetData={burnesPerAsset}
              chartLoading={loading}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Paper sx={{ p: 2 }}>
          <DashboardTable furnaceData={furnaceData} />
        </Paper>
      </Grid>
      <Grid xs={12}>
        <DashboardCharts furnaceData={furnaceData} chartLoading={loading} />
      </Grid>
    </Grid>
  )
}
