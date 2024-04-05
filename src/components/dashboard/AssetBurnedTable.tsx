import { ENDPOINTS } from '@/constants'
import { getAssetLogo } from '@/util/asset/getAssetLogo'
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
import { assets } from 'chain-registry'
import { useState, type FC } from 'react'

// This is dummy data just to build ui for now
const getAssetInfo = {
  migaloo: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'WHALE'),
      burned: 3_428_978,
      uniques: 5_428
    },
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'GUPPY'),
      burned: 43_768_000,
      uniques: 428
    }
  ],
  chihuahua: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'chihuahua')
        ?.assets.find(({ symbol }) => symbol === 'HUAHUA'),
      burned: 234_789,
      uniques: 128
    }
  ]
}

const AssetBurnedTable: FC = () => {
  const assetData = Object.entries(getAssetInfo).flatMap(([chain, chainInfo]) =>
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
           .keys(getAssetInfo)
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
      <Table aria-label="assets burned table">
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
          {/* <TableRow><Chip label={'df'}/><Chip label={'df'}/><Chip label={'df'}/></TableRow> */}
        </TableHead>
        <TableBody>
          {filteredAssets.map(({ chain, asset, burned, uniques }) => {
            const { chainColor } = ENDPOINTS[chain.toLowerCase()]

            return (
              asset != null && (
                <TableRow
                  key={`${asset.base}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row" gap={1}>
                      <Avatar
                        alt={`${asset.symbol} Logo`}
                        sx={{ width: 24, height: 24 }}
                        src={getAssetLogo(asset)}
                      />
                      <Typography>{asset.symbol}</Typography>
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
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}

export default AssetBurnedTable
