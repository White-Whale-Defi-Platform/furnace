'use client'
import { ENDPOINTS } from '@/constants'
import type { TotalFurnaceData } from '@/hooks'
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
  Grid
} from '@mui/material'
import { useState, type FC } from 'react'

interface Props {
  furnaceData: TotalFurnaceData[]
}
export const DashboardTable: FC<Props> = ({ furnaceData }) => {
  const [filterChain, setFilterChain] = useState<string>()
  // Filtered Assets by chain name. Default to be all chains
  const filteredAssets = filterChain === undefined
    ? furnaceData
    : furnaceData.filter(([chainName]) => chainName)

  return (
    <Grid>
      {
       <Stack direction="row" gap={1} maxWidth={300}>
        <Chip label="All" variant="outlined"
               color={filterChain === undefined ? 'primary' : 'default'}
               onClick={() => setFilterChain(undefined)}/>
       {
         furnaceData.map(([chainName]) => (
             <Chip
               key={chainName}
               variant="outlined"
               label={chainName}
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
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Burned Value
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Unique Burners
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(filteredAssets).map(([chainName, { fuelDenom, asset, leaderboard }]) => {
            const { chainColor } = ENDPOINTS[chainName]
            return (
                <TableRow
                  key={fuelDenom}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row" gap={1}>
                      <Avatar
                        alt={`${asset?.name} Logo`}
                        sx={{ width: 24, height: 24 }}
                        src={asset?.logo}
                      />
                      <Typography>{asset?.name}</Typography>
                      <Chip
                        sx={{
                          borderColor: chainColor,
                          color: chainColor
                        }}
                        variant="outlined"
                        size="small"
                        label={chainName}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {new Intl.NumberFormat().format(leaderboard.totalBurnedAssets / Math.pow(10, asset?.decimals))}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {new Intl.NumberFormat().format(leaderboard.uniqueBurners)}
                    </Typography>
                  </TableCell>
                </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}
