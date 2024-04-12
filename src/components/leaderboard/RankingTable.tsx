'use client'
import { truncateAddress } from '@/util/format/truncateAddress'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import React, { type FC, useCallback, useState } from 'react'

interface Props {
  data: Array<{
    id: string
    totalBurn: string
  }>
}

export const RankingTable: FC<Props> = ({ data }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  //  Table pagination click event
  const onChangePage = useCallback((
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage)
  }, [])

  //  Table pagination "rows per page drop down" event
  const onChangeRowsPerPage = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  return (
    <TableContainer
      sx={{ background: '#18181b', paddingX: 3, paddingTop: 1.5 }}
    >
      <Table aria-label="ranking table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Address / Name</TableCell>
            <TableCell align='right'>Total Burned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((value) => (
            <TableRow key={Math.random()}>
              <TableCell>{`#${data.indexOf(value) + 1}`}</TableCell>
              <TableCell color="brandGreen">
                {truncateAddress(value.id)}
              </TableCell>
              <TableCell align='right'>
                {new Intl.NumberFormat().format(Number(value.totalBurn))}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component={'div'}
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
