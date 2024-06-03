'use client'
import type { FC, PropsWithChildren } from 'react'
import {
  Stack,
  Button,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { useRouter } from 'next/navigation'
import { useModal } from './provider'
import { KadoModal } from './modals/KadoModal'
import { Language, X } from '@mui/icons-material'
import { Discord } from '../../public/assets/Discord'
import FurnaceSearchBar from './furnaceSearchBar/FurnaceSearchBar'
import Image from 'next/image'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const modal = useModal()

  return (
    <>
      <Box sx={{ position: 'relative', padding: 0 }}>
        <Image
          style={{
            zIndex: -1,
            overflowY: 'scroll',
            backgroundAttachment: 'fixed'
          }}
          src="/assets/fireAshes_bg.jpeg"
          alt="burning page background"
          fill
          quality={100}
        />
        <Stack component="nav" py={3} px={{ xs: 2, md: 5 }}>
          <Grid
            container
            xl={9}
            justifyContent={'space-between'}
            sx={{ alignSelf: { xl: 'center' } }}
          >
            <Grid alignItems="center">
              <Avatar
                src="/assets/ashdao.jpg"
                onClick={() => router.push('/')}
                sx={{ cursor: 'pointer' }}
              />
            </Grid>
            <Grid>
              <FurnaceSearchBar />
            </Grid>
            <Grid
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
        </Stack>
        <Stack
          component="main"
          direction="column"
          minHeight="calc(100vh - 128px)"
          py={{ xs: 1, md: 3 }}
          px={{ xs: 2, md: 5 }}
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
                aria-label="website"
                onClick={() => window.open('https://ash-dao.net/', '_blank')}
              >
                <Language />
              </IconButton>
              <IconButton
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
