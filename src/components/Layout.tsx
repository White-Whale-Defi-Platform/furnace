'use client'
import type { FC, PropsWithChildren } from 'react'
import {
  useTheme,
  Stack,
  Button,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Grid,
  createTheme
} from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from './provider'
import { KadoModal } from './modals/KadoModal'
import { Language, X } from '@mui/icons-material'
import { Discord } from '../../public/assets/Discord'
import FurnaceSearchBar from './furnaceSearchBar/FurnaceSearchBar'
import Image from 'next/image'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const modal = useModal()

  return (
    <>
    <Box sx={{ position: 'relative', padding: 0 }}>
        <Image
         style={{ zIndex: -1, overflowY: 'scroll', backgroundAttachment: 'fixed' }}
         src="/assets/fireAshes_bg.jpeg"
         alt="burning page background"
         fill
         quality={100}
      />
        <Stack component="nav">
        <Toolbar>
          <Grid xs={12} container alignItems="center">
            <Grid xs={3} alignItems="center">
              <Avatar
                src="/assets/ashdao.jpg"
                onClick={() => router.push('/')}
                sx={{ cursor: 'pointer' }}
              />
            </Grid>
            <Grid xs={6}>
              <FurnaceSearchBar />
            </Grid>
            <Grid
              xs={3}
              sx={{ flexGrow: 1 }}
              display="flex"
              gap={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
              sx={{ display: { xs: 'none', md: 'block' } }}
                variant="outlined"
                color="inherit"
                onClick={() => modal.open(<KadoModal />)}
              >
                Buy Whale
              </Button>
              <AccountMenu />
            </Grid>
          </Grid>
          </Toolbar>
        </Stack>
      <Stack
        component="main"
        direction="column"
        minHeight="calc(100vh - 128px)"
        px={5}
        py={3}
      >
        {children}
      </Stack>
      <Stack
        component="footer"
        position="fixed"
        sx={{ position: 'relative', bottom: 0 }}
      >
        <Toolbar sx={{ flex: 1, direction: 'row', justifyContent: 'center' }}>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            width="100%"
          >
            <IconButton
              color="primary"
              aria-label="website"
              onClick={() => window.open('https://ash-dao.net/', '_blank')}
            >
              <Language />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="X Icon"
              onClick={() =>
                window.open('https://twitter.com/_ASH_DAO', '_blank')
              }
            >
              <X />
            </IconButton>
            <IconButton
              aria-label="Discord Icon"
              onClick={() =>
                window.open('https://discord.com/invite/PEJzbV25mX', '_blank')
              }
            >
              <Discord />
            </IconButton>
          </Stack>
        </Toolbar>
      </Stack>
    </Box>
    </>
  )
}
