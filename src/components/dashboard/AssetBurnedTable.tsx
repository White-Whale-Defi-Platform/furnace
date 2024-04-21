'use client'
import { ENDPOINTS } from '@/constants'
import { useFetchChainAssets, useFetchTableData } from '@/hooks'
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

export const AssetBurnedTable: FC = () => {
  const fetchChainAsset = useFetchChainAssets('osmosis')
  const fetchTableData = useFetchTableData('osmosis')

  const assetInfo = {
    osmosis: (fetchChainAsset.data != null)
      ? fetchChainAsset.data.map((asset) => ({
        asset,
        burned: (fetchTableData?.totalBurnedAssets) / Math.pow(10, asset.decimals),
        uniques: fetchTableData?.uniqueBurners
      }))
      : []
  }
  const assetData = Object.entries(assetInfo).flatMap(([chain, chainInfo]) =>
    chainInfo.map((asset) => ({ chain, ...asset }))
  )

  const [filterChain, setFilterChain] = useState<string>()

  // Filtered Assets by chain name. Default to be all chains
  const filteredAssets = filterChain === undefined
    ? assetData
    : assetData.filter(({ chain }) => chain === filterChain)

  return (
    <Grid>
      {
       <Stack direction="row" gap={1} maxWidth={300}>
        <Chip label="All" variant="outlined"
               color={filterChain === undefined ? 'primary' : 'default'}
               onClick={() => setFilterChain(undefined)}/>
       {
         Object
           .keys(assetInfo)
           .map((chainName) => (
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
          {filteredAssets.map(({ chain, asset: { id, name, logo }, burned, uniques }) => {
            const { chainColor } = ENDPOINTS[chain.toLowerCase()]

            return (
                <TableRow
                  key={`${id}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row" gap={1}>
                      <Avatar
                        alt={`${name} Logo`}
                        sx={{ width: 24, height: 24 }}
                        src={logo}
                      />
                      <Typography>{name}</Typography>
                      <Chip
                        sx={{
                          borderColor: chainColor,
                          color: chainColor
                        }}
                        variant="outlined"
                        size="small"
                        label={chain}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {new Intl.NumberFormat().format(burned)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">
                    <Typography fontSize="medium">
                      {new Intl.NumberFormat().format(uniques)}
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
