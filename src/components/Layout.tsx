'use client'
import type { FC, PropsWithChildren } from 'react'
import { useTheme, Stack, Button, Typography, Avatar, AppBar, Toolbar } from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from './provider'
import { LeaveWebsiteModal } from './modals/LeaveWebsiteModal'
import { KadoModal } from './modals/KadoModal'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const modal = useModal()

  return (
    <>
      <AppBar component="nav" enableColorOnDark color="inherit" elevation={1}>
        <Toolbar>
          <Stack direction="row" alignItems="center" justifyContent="space-between" width='100%'>
            <Stack direction="row" alignItems="center" gap={1} sx={{ width: 128 }}>

              <Avatar src="/chains/migaloo.svg" onClick={() => router.push('/')} sx={{ cursor: 'pointer' }} />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ flex: 1 }}>
              <Button variant="text" color={pathname.startsWith('/apps') ? 'primary' : 'inherit'} sx={{ textTransform: 'none', px: theme.spacing(2) }} onClick={() => router.push('/apps')}>
                <Typography fontSize="medium">Apps</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2) }} onClick={() => modal.open(<LeaveWebsiteModal url="https://app.pulsar.finance" />)}>
                <Typography fontSize="medium">Portfolio</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2) }} onClick={() => modal.open(<LeaveWebsiteModal url="https://app.whitewhale.money" />)}>
                <Typography fontSize="medium">Trade</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2) }} onClick={() => modal.open(<LeaveWebsiteModal url="https://app.migaloo.zone" />)}>
                <Typography fontSize="medium">Earn</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2) }} onClick={() => modal.open(<LeaveWebsiteModal url="https://explorer.kjnodes.com/migaloo" />)}>
                <Typography fontSize="medium">Explorer</Typography>
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="end" spacing={2} sx={{ width: 256 }}>
              <Button variant="outlined" color="inherit" onClick={() => modal.open(<KadoModal />)}>
                Buy Whale
              </Button>
              <AccountMenu />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack component="main" direction="column" minHeight='100vh' p={2}>
        {children}
      </Stack>
      <AppBar component="footer" position="fixed" sx={{ position: 'relative', bottom: 0 }}>
        <Toolbar>
          Footer
        </Toolbar>
      </AppBar>
    </>
  )
}

/*
'use client'
import { type FC, type PropsWithChildren, useState } from 'react'
import { useTheme, Stack, IconButton, Drawer, Button, Typography, Divider, Avatar, useMediaQuery, Breadcrumbs, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AccountMenu } from './AccountMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from '../provider'
import { KadoModal } from '../modals/KadoModal'
import { useChainContext } from '@/hooks'
import { LeaveWebsiteModal } from '../modals/LeaveWebsiteModal'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const chain = useChainContext()
  const [open, setOpen] = useState(false)

  const modal = useModal()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <Drawer open={open} onClose={(): void => setOpen(false)} PaperProps={{ elevation: 1 }} sx={{ width: 192, '& .MuiDrawer-paper': { width: 192 } }}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 64, padding: theme.spacing(1) }}>
          <Typography fontSize="large" fontWeight="medium">Migaloo Command</Typography>
        </Stack>
        <Divider />
        <Stack alignItems="center" sx={{ flex: 1, padding: theme.spacing(1) }}></Stack>
        <Divider />
        <Stack alignItems="center" justifyContent="center" sx={{ height: 64, padding: theme.spacing(1) }}>
          <Button variant="outlined" color="inherit" onClick={(): void => modal.open(<KadoModal />)} sx={{ width: '100%', borderRadius: theme.shape.borderRadius }}>
            Buy Whale
          </Button>
        </Stack>
      </Drawer>
      <Stack direction="column" gap={2} sx={{ px: theme.spacing(2), width: '100vw', minHeight: '100vh' }}>
        <Stack component="nav" direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
          <Stack direction="row" alignItems="center" gap={1} sx={{ width: 128 }}>
            {!sm && (
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            )
            }
            <Avatar src="/chains/migaloo.svg" onClick={() => router.push('/')} sx={{ cursor: 'pointer' }} />
          </Stack>
          {sm && (
            <Stack direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ flex: 1 }}>
              <Button variant="text" color={pathname.startsWith('/portfolio') ? 'primary' : 'inherit'} sx={{ textTransform: 'none', px: theme.spacing(2), borderRadius: theme.shape.borderRadius }} onClick={() => router.push('/portfolio')}>
                <Typography fontSize="medium">Portfolio</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2), borderRadius: theme.shape.borderRadius }} onClick={() => modal.open(<LeaveWebsiteModal url="https://app.whitewhale.money" />)}>
                <Typography fontSize="medium">Trade</Typography>
              </Button>
              <Button variant="text" color={pathname.startsWith('/earn') ? 'primary' : 'inherit'} sx={{ textTransform: 'none', px: theme.spacing(2), borderRadius: theme.shape.borderRadius }} onClick={() => router.push('/earn')}>
                <Typography fontSize="medium">Earn</Typography>
              </Button>
              <Button variant="text" color={pathname.startsWith('/apps') ? 'primary' : 'inherit'} sx={{ textTransform: 'none', px: theme.spacing(2), borderRadius: theme.shape.borderRadius }} onClick={() => router.push('/apps')}>
                <Typography fontSize="medium">Apps</Typography>
              </Button>
              <Button variant="text" color="inherit" sx={{ textTransform: 'none', px: theme.spacing(2), borderRadius: theme.shape.borderRadius }} onClick={() => modal.open(<LeaveWebsiteModal url="https://explorer.kjnodes.com/migaloo" />)}>
                <Typography fontSize="medium">Explorer</Typography>
              </Button>
            </Stack>
          )
          }
          <Stack direction="row" alignItems="center" justifyContent="end" gap={2} sx={{ width: 128 }}>
            <AccountMenu />
          </Stack>
        </Stack>
        <Stack component="main" direction="column" flexGrow={1}>
          {children}
        </Stack>
        <footer style={{ height: 64 }}></footer>
      </Stack>
    </>
  )
}

*/
