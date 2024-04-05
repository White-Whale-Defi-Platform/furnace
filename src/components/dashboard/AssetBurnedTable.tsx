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
  Typography
} from '@mui/material'
import { assets } from 'chain-registry'
import type { Asset } from '@chain-registry/types'
import type { FC } from 'react'
import { unique } from 'next/dist/build/utils'

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
  return (
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
        </TableHead>
        <TableBody>
          {assetData.map(({ chain, asset, burned, uniques }) => {
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
  )
}

export default AssetBurnedTable
