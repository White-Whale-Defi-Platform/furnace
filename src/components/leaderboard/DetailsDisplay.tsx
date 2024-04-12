import { Grid } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'

export const DetailsDisplay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container sx={{ background: '#18181b', padding: 3 }}>
      {children}
    </Grid>
  )
}

export default DetailsDisplay
