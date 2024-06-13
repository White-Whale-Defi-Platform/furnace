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
  Button,
  Tooltip,
  Skeleton,
  styled,
  TablePagination
} from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import { useRouter } from 'next/navigation'
import { useCallback, useState, type FC } from 'react'

interface Props {
  furnaceData: Array<[ChainName, Array<TotalFurnaceData[1]>]>
}

const ChartLabel = styled(Typography)({
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

export const DashboardTable: FC<Props> = ({ furnaceData }) => {
  const router = useRouter()
  const [filterChain, setFilterChain] = useState<string>()
  const flattenedFurnaceData = furnaceData.flatMap(([chainName, assets]) =>
    assets.map((asset) => [chainName, asset] as const)
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Filtered assets by chain name. Default to be all chains
  const filteredAssets =
    filterChain === undefined
      ? flattenedFurnaceData
      : flattenedFurnaceData.filter(([chainName]) => chainName === filterChain)

  const fuelAssets = Object.entries(furnaceData).map(([_, assetInfos]) => (
    [assetInfos[0],
      assetInfos[1].length] as const
  ))
  const totalAssets = fuelAssets.reduce((assets, [_, asset]) => assets + asset, 0)

  //  Table pagination click event
  const onChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ): void => {
      setPage(newPage)
    },
    []
  )

  //  Table pagination "rows per page drop down" event
  const onChangeRowsPerPage = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    []
  )
  return (
    <Grid container direction={'column'} gap={2}>
      <ChartLabel>Asset Breakdown</ChartLabel>
      {
        <Stack direction="row" gap={1} maxWidth={300}>
          <Chip
            avatar={<Avatar sx={{ backgroundColor: '#ae6628' }}>{totalAssets}</Avatar>}
            label="All"
            color={filterChain === undefined ? 'primary' : 'secondary'}
            onClick={() => setFilterChain(undefined)}
          />
          {(flattenedFurnaceData.length > 0
            ? flattenedFurnaceData
            : Object.entries(ENDPOINTS)
          ).map(([chainName]) => (
            <Chip
              avatar={<Avatar sx={{ backgroundColor: '#ae6628' }}>{Object.fromEntries(fuelAssets)[chainName] || 0}</Avatar>}
              key={chainName}
              label={formatPrettyName(chainName)}
              color={filterChain === chainName ? 'primary' : 'secondary'}
              onClick={() => setFilterChain(chainName)} />
          ))}
        </Stack>
      }
      <TableContainer>
        <Table aria-label="burned assets table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }}>
                Asset
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: 'bold' }}
              >
                Burned Tokens
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: 'bold' }}
              >
                Unique Burners
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {furnaceData.length > 0
              ? (rowsPerPage > 0
                  ? filteredAssets.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : filteredAssets).map(
                  ([
                    chainName,
                    {
                      asset,
                      leaderboard: { totalBurnedAssets, uniqueBurners }
                    }
                  ]) => {
                    const { chainColor } = ENDPOINTS[chainName]
                    return asset != null
                      ? (
                      <TableRow
                        key={asset.burnAsset.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Button
                            sx={{
                              border: 'none',
                              '&:hover': { bgcolor: 'transparent' }
                            }}
                            type="button"
                            onClick={() =>
                              router.push(
                                `/${chainName}/${asset.burnAsset.name}`
                              )
                            }
                          >
                            <Tooltip
                              title={`Click to burn ${asset.burnAsset.name}`}
                              placement="top"
                            >
                              <Stack direction="row" gap={1}>
                                <Avatar
                                  alt={`${asset.burnAsset.name} Logo`}
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: '#2B2626'
                                  }}
                                  src={asset.burnAsset.logo}
                                />
                                <Typography
                                  sx={{ '&:hover': { color: `${chainColor}` } }}
                                >
                                  {asset.burnAsset.name}
                                </Typography>
                                <LinkIcon color='secondary' sx={{ width: '30px' }} />
                              </Stack>
                            </Tooltip>
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontSize="medium">
                            {formatTokenAmount(
                              totalBurnedAssets /
                                Math.pow(10, asset.burnAsset.decimals)
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontSize="medium">
                            {formatTokenAmount(uniqueBurners)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                        )
                      : (
                      <></>
                        )
                  }
                )
              : [...new Array(rowsPerPage)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={3}>
                      <Stack direction="row" gap={1}>
                        <Skeleton variant="circular">
                          <Avatar
                            sx={{ width: 24, height: 24 }}
                          />
                        </Skeleton>
                        <Skeleton width={'100%'}>
                        </Skeleton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
        component={'div'}
        colSpan={3}
        count={filteredAssets.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
    </Grid>
  )
}
