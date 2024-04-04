import { ENDPOINTS } from '@/constants'
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
import type { FC } from 'react'

// This is dummy data just to build ui for now
const getAssetInfo = {
  migaloo: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'WHALE'),
      burned: 3_428_978
    },
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'migaloo')
        ?.assets.find(({ symbol }) => symbol === 'GUPPY'),
      burned: 43_768_000
    }
  ],
  chihuahua: [
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'chihuahua')
        ?.assets.find(({ symbol }) => symbol === 'HUAHUA'),
      burned: 234_789
    }
  ]
}

const AssetBurnedTable: FC = () => {
  const assetData = Object.entries(getAssetInfo).flatMap(([chain, chainInfo]) =>
    chainInfo.map((asset) => ({ chain, ...asset }))
  )
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Asset
            </TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }}>
              Burned
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetData.map(({ chain, asset, burned }) => {
            const { chainColor } = ENDPOINTS[chain.toLowerCase()]
            return (
              <TableRow
                key={burned}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction='row' gap={1}>
                    <Avatar
                      alt="asset logo"
                      sx={{ width: 24, height: 24 }}
                      src={asset?.logo_URIs?.png ?? asset?.logo_URIs?.svg} />
                    <Typography>{asset?.symbol}</Typography>
                    <Chip
                      sx={{
                        borderColor: chainColor,
                        color: chainColor
                      }}
                      variant="outlined"
                      size="small"
                      label={chain} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography fontSize='medium'>
                    {new Intl.NumberFormat().format(burned)}
                  </Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AssetBurnedTable
