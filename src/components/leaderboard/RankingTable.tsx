'use client'
import { KNOWN_ADDRESSES } from '@/constants'
import {
  formatAmountWithExponent,
  formatTokenAmount,
  truncateAddress,
} from '@/util'
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import React, { type FC, useCallback, useState } from 'react'

interface Props {
  data: Array<{
    id: string
    totalBurn: number
  }>
  decimals: number
}

const RankingTable: FC<Props> = ({ data, decimals }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows
    = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  //  Table pagination click event
  const onChangePage = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement> | null,
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
    <TableContainer
      sx={{ paddingTop: 1.5 }}
    >
      <Table aria-label="ranking table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Address / Name</TableCell>
            <TableCell align="right">Total Burned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0
          // While the data is still loading
            ? Array.from({ length: rowsPerPage }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={3}>
                  <Skeleton />
                </TableCell>
              </TableRow>
            )
            )
          // After the data is fetched then it shows the ranking table
            : (rowsPerPage > 0
                ? data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : data
              ).map((value) => {
                const userAddress = value.id
                return (
                  <TableRow key={Math.random()}>
                    <TableCell>{`#${data.indexOf(value) + 1}`}</TableCell>
                    <TableCell color="brandGreen">
                      {userAddress in KNOWN_ADDRESSES
                        ? KNOWN_ADDRESSES[userAddress]
                        : truncateAddress(userAddress)}
                    </TableCell>
                    <TableCell align="right">
                      {formatTokenAmount(
                        Number(
                          formatAmountWithExponent(value.totalBurn, decimals)
                        )
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        colSpan={3}
        showFirstButton
        showLastButton
        count={data.length}
        onPageChange={onChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, { label: 'All', value: -1 }]}
      />
    </TableContainer>
  )
}

export default RankingTable
