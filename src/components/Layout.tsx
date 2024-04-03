'use client'
import type { FC, PropsWithChildren } from 'react'
import { useTheme, Stack, Button, Avatar, AppBar, Toolbar, IconButton } from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from './provider'
import { KadoModal } from './modals/KadoModal'
import { Language, X } from '@mui/icons-material'
import { Discord } from './icons/Discord'
import FurnaceSearchBar from './furnaceSearchBar/FurnaceSearchBar'

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
           <FurnaceSearchBar />
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
      <AppBar component='footer' position='fixed' sx={{ position: 'relative', bottom: 0 }}>
        <Toolbar sx={{ flex: 1, direction: 'row', justifyContent: 'center' }}>
            <Stack direction='row' spacing={4} justifyContent='center' width='100%'>
              <IconButton color='primary' aria-label='website' onClick={() => window.open('https://ash-dao.net/', '_blank')}>
                <Language />
              </IconButton>
              <IconButton color='primary' aria-label='X Icon' onClick={() => window.open('https://twitter.com/_ASH_DAO', '_blank')}>
                <X />
              </IconButton>
              <IconButton aria-label='Discord Icon' onClick={() => window.open('https://discord.com/invite/PEJzbV25mX', '_blank')}>
                <Discord />
              </IconButton>
            </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
