import { Grid } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface Prop {
  children: ReactNode
}

export const DetailsDisplay: FC<Prop> = ({ children }) => {
  return (
    <Grid container sx={{ background: '#18181b', padding: 3 }}>
      {children}
    </Grid>
  )
}

export default DetailsDisplay
