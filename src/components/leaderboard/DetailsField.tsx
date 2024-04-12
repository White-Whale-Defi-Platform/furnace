'use client'
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material'
import type { FC } from 'react'

interface Props {
  label: string
  data: string
}

export const DetailsField: FC<Props> = ({ label, data }) => {
  return (
        <Grid flexGrow={1} gap={3}>
          <Typography color="GrayText">{label}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{data}</Typography>
        </Grid>
  )
}

export default DetailsField
