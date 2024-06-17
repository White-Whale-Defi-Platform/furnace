'use client'
import type { FC, PropsWithChildren } from 'react'
import {
  Stack,
  Button,
  Avatar,
  Box,
  Toolbar,
  styled,
  IconButton,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { useRouter } from 'next/navigation'
import { useModal } from './provider'
import { KadoModal } from './modals/KadoModal'
import { Language, X } from '@mui/icons-material'
import { Discord } from '../../public/assets/Discord'
import { FurnaceSearchBar } from './furnaceSearchBar'

const BuyWhaleBtn = styled(Button)({
  'backgroundColor': '#318b68',
  'border': 'none',
  'color': 'white',
  '&:hover': { backgroundColor: '#276f53', border: 'none' },
})

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const modal = useModal()

  return (
    <>
      <Box sx={{ position: 'relative', padding: 0 }}>
        <Stack component="nav" py={1} px={{ xs: 2, md: 5 }}>
          <Grid
            container
            xl={9}
            justifyContent="space-between"
            sx={{ alignSelf: { xl: 'center' } }}
          >
            <Grid alignItems="center">
              <Button
                onClick={() => { router.push('/') }}
                sx={{ cursor: 'pointer', paddingLeft: 0 }}
              >
                <Avatar src="/assets/ashdao.jpg" />
                <Typography
                  sx={{ paddingLeft: 1 }}
                  fontSize={20}
                  fontWeight={520}
                  color="primary"
                >
                  Furnace
                </Typography>
              </Button>
            </Grid>
            <Grid alignContent="center">
              <FurnaceSearchBar />
            </Grid>
            <Grid
              display="flex"
              gap={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <BuyWhaleBtn
                sx={{ display: { xs: 'none', md: 'block' } }}
                variant="outlined"
                onClick={() => { modal.open(<KadoModal />) }}
              >
                Buy Whale
              </BuyWhaleBtn>
              <AccountMenu />
            </Grid>
          </Grid>
        </Stack>
        <Stack
          sx={{ background: 'linear-gradient(to right top, #29170b, #844c26)' }}
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
                  window.open('https://twitter.com/_ASH_DAO', '_blank')}
              >
                <X />
              </IconButton>
              <IconButton
                aria-label="Discord Icon"
                onClick={() =>
                  window.open('https://discord.com/invite/PEJzbV25mX', '_blank')}
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
