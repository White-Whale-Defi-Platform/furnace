'use client'
import { formatPrettyName } from '@/util'
import { Unstable_Grid2 as Grid, Breadcrumbs, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'

const BreadcrumbComponent = (): JSX.Element => {
  const pathnames = usePathname().split('/').slice(1)
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.length < 2
        ? <Typography color="secondary" >
            {'/ Home' }
          </Typography>
        : <Typography color="secondary">
            {`/ Home / ${formatPrettyName(pathnames[0])} - ${formatPrettyName(pathnames[1]).toUpperCase()}`}
          </Typography>
          }
    </Breadcrumbs>
  )
}
export interface PageLayoutProps extends PropsWithChildren {
  title?: string
  subtitle?: string
}

export const PageLayout: FC<PageLayoutProps> = ({
  title,
  subtitle,
  children
}): JSX.Element => (
  <>
    <Grid container xl={9} sx={{ alignSelf: { xl: 'center' } }}>
      <Grid flexDirection={'column'}>
        <BreadcrumbComponent />
        <Typography
          color="secondary"
          variant="h4"
          pb={subtitle == null ? '15px' : 'none'}
        >
          {title}
        </Typography>
        <Typography color="secondary" variant="h6">
          {subtitle}
        </Typography>
      </Grid>
    </Grid>
    {children}
  </>
)
