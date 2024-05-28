'use client'
import { type ChainName, ENDPOINTS } from '@/constants'
import { TotalFurnaceData } from '@/state'
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
  Unstable_Grid2 as Grid
} from '@mui/material'
import { useState, type FC } from 'react'

interface Props {
  furnaceData: Array<[ChainName, Array<TotalFurnaceData[1]>]>
}

export const DashboardTable: FC<Props> = ({ furnaceData }) => {
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
               color={filterChain === undefined ? 'primary' : 'default'}
               onClick={() => setFilterChain(undefined)}/>
       {
         flattenedFurnaceData.map(([chainName]) => (
             <Chip
               key={chainName}
               variant="outlined"
               label={formatPrettyName(chainName)}
               color={filterChain === chainName ? 'primary' : 'default'}
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
            {/* <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Burned Value
            </TableCell> */}
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Unique Burners
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAssets.map(([chainName, { asset, leaderboard: { totalBurnedAssets, uniqueBurners } }]) => {
            const { chainColor } = ENDPOINTS[chainName]
            return (asset != null
              ? <TableRow
                  key={asset.burnAsset.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row" gap={1}>
                      <Avatar
                        alt={`${asset.burnAsset.name} Logo`}
                        sx={{ width: 24, height: 24 }}
                        src={asset.burnAsset.logo}
                      />
                      <Typography>{asset.burnAsset.name}</Typography>                  
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {formatTokenAmount(totalBurnedAssets / Math.pow(10, asset.burnAsset.decimals))}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="center">-</TableCell> */}
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {formatTokenAmount(uniqueBurners)}
                    </Typography>
                  </TableCell>
                </TableRow>
              : <></>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}
