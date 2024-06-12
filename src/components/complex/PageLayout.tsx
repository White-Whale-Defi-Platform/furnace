'use client'
import { formatPrettyName } from '@/util'
import { Unstable_Grid2 as Grid, Breadcrumbs, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'

const BreadcrumbComponent = (): JSX.Element => {
  const pathnames = usePathname().split('/').slice(1)
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        return last
          ? <Typography color="secondary" key={to}>
            {index === 0 ? '/ Home' : ''}
          </Typography>

          : <Typography color="secondary" key={to}>
            {`/ Home / ${formatPrettyName(pathnames[0])} - ${formatPrettyName(pathnames[1])}`}
          </Typography>
      })}
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
