'use client'
import { Box, Breadcrumbs, Typography } from '@mui/material'
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
          ? <Typography color="inherit" key={to}>
            {index === 0 ? '/home' : ''}{value}
          </Typography>
          : <Typography color="inherit" >
            {value}
          </Typography>
      })}
    </Breadcrumbs>
  )
}

export interface PageLayoutProps extends PropsWithChildren {
  title?: string
  subtitle?: string
}

export const PageLayout: FC<PageLayoutProps> = ({ title, subtitle, children }): JSX.Element => (
  <>
    <Box>
      <BreadcrumbComponent />
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='h6' color="GrayText">{subtitle}</Typography>
    </Box>
    {children}
  </>
)
