'use client'
import {
  Unstable_Grid2 as Grid,
  Paper,
  styled,
  Typography
} from '@mui/material'
import React, { type FC } from 'react'
import { DashboardCharts, DashboardTable } from '@/components'
import { useFetchAllChainAssets, useFetchFurnaceData } from '@/hooks'
import { useRecoilValue } from 'recoil'
import { chainLeaderboardSelector, clientsAtom } from '@/state'

const DashboardBox = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 20
})

export const DashboardLayout: FC = () => {
  const allChains = useFetchAllChainAssets()
  const furnaceData = useFetchFurnaceData()

  // const allFuelsByChain = useRecoilValue(allChainAssetsSelector)

  // TODO: Update the dashboard, DashboardTable, and DashboardCharts data with the recoil value
  // const furnace = useRecoilValue(furnaceSelector)

  return (
    <Grid gap={3} container justifyContent="space-between">
      {/* <DashboardBox>
        <Typography color="GrayText">Total Value Burned</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>-</Typography>
      </DashboardBox> */}
      <DashboardBox>
        <Typography color="GrayText">Chains Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {/* {(allFuelsByChain != null) && Object.entries(allFuelsByChain).length} */}
        </Typography>
      </DashboardBox>
      <DashboardBox>
        <Typography color="GrayText">Assets Supported</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
          {allChains.some(
            ({ isLoading, isError, isPending }) =>
              isLoading || isError || isPending
          )
            ? '-'
            : allChains
              .map(({ data: chainInfo }) => chainInfo?.[1].length ?? 0)
              .reduce((x, y) => x + y, 0)}
        </Typography>
      </DashboardBox>
      <Grid xs={12}>
        <DashboardBox>
          <DashboardTable furnaceData={furnaceData} />
        </DashboardBox>
      </Grid>
      <Grid xs={12}>
        <DashboardCharts furnaceData={furnaceData} />
      </Grid>
    </Grid>
  )
}
export default DashboardLayout
function fuelsSelector (arg0: string): import('recoil').RecoilValue<unknown> {
  throw new Error('Function not implemented.')
}
