'use client'
import { type ChainName, ENDPOINTS } from '@/constants'
import type { TotalFurnaceData } from '@/state'
import { formatPrettyName, formatTokenAmount } from '@/util'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Button
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState, type FC } from 'react'

interface Props {
  furnaceData: Array<[ChainName, Array<TotalFurnaceData[1]>]>
}

export const DashboardTable: FC<Props> = ({ furnaceData }) => {
  const router = useRouter()
  const [filterChain, setFilterChain] = useState<string>()
  const flattenedFurnaceData = furnaceData.flatMap(([chainName, assets]) => assets.map((asset) => [chainName, asset] as const))

  // Filtered assets by chain name. Default to be all chains
  const filteredAssets = filterChain === undefined
    ? flattenedFurnaceData
    : flattenedFurnaceData.filter(([chainName]) => chainName === filterChain)

  return (
    <Grid>
      {
       <Stack direction="row" gap={1} maxWidth={300}>
        <Chip label="All" variant="outlined"
               color={filterChain === undefined ? 'primary' : 'secondary'}
               onClick={() => setFilterChain(undefined)}/>
       {
         ((flattenedFurnaceData.length > 0) ? flattenedFurnaceData : Object.entries(ENDPOINTS)).map(([chainName]) => (
             <Chip
               key={chainName}
               variant="outlined"
               label={formatPrettyName(chainName)}
               color={filterChain === chainName ? 'primary' : 'secondary'}
               onClick={() => setFilterChain(chainName)} />
         ))
       }
     </Stack>
      }
    <TableContainer>
      <Table aria-label="burned assets table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Asset
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Burned Tokens
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Unique Burners
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {furnaceData.length > 0
            ? filteredAssets.map(([chainName, { asset, leaderboard: { totalBurnedAssets, uniqueBurners } }]) => {
              const { chainColor } = ENDPOINTS[chainName]
              return (asset != null
                ? <TableRow
                  key={asset.burnAsset.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <Button sx={{ border: 'none', '&:hover': { bgcolor: 'transparent' } }} type="button" onClick={() => router.push(`/${chainName}/${asset.burnAsset.name}`)}>
                    <Stack direction="row" gap={1}>
                      <Avatar
                        alt={`${asset.burnAsset.name} Logo`}
                        sx={{ width: 24, height: 24, bgcolor: '#131D33' }}
                        src={asset.burnAsset.logo}
                      />
                      <Typography sx={{ '&:hover': { color: `${chainColor}` } }}>{asset.burnAsset.name}</Typography>
                    </Stack>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {formatTokenAmount(totalBurnedAssets / Math.pow(10, asset.burnAsset.decimals))}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {formatTokenAmount(uniqueBurners)}
                    </Typography>
                  </TableCell>
                </TableRow>
                : <></>
              )
            })
            : <TableRow>
                <TableCell colSpan={3}><Typography>Loading Assets</Typography></TableCell>
              </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}
