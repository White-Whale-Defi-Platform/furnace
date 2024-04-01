'use client'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import { useTheme, Stack, Button, Avatar, AppBar, Toolbar, Autocomplete, TextField } from '@mui/material'
import { AccountMenu } from './AccountMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from './provider'
import { LeaveWebsiteModal } from './modals/LeaveWebsiteModal'
import { KadoModal } from './modals/KadoModal'
import { useSigningCosmWasmClient } from '@/hooks'
import { ChainRegistryClient } from '@chain-registry/client'
import { ENDPOINTS } from '@/constants'
import { assets, chains, ibc } from 'chain-registry'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const modal = useModal()

  const { result: client } = useSigningCosmWasmClient()

  useEffect(() => {
    (async () => {
      if (client != null) {
        // querying smartcontract
        const { native_denom } = await client.queryContractSmart(ENDPOINTS.migaloo.furnaces[1], { config: {} })
        // get migaloo assets
        const denomData = assets.find(({ chain_name }) => chain_name === 'migaloo')?.assets.find((asset) => asset.base === native_denom)

        console.log(denomData, 'get assets')
      }
    })().catch(console.log)
  }, [client])

  const assetOption = [{ label: 'whale/ash' }, { label: 'guppy/gash' }]
  return (
    <>
      <AppBar component="nav" enableColorOnDark color="inherit" elevation={1}>
        <Toolbar>
          <Stack direction="row" alignItems="center" justifyContent="space-between" width='100%'>
            <Stack direction="row" alignItems="center" gap={1} sx={{ width: 128 }}>

              <Avatar src="/chains/migaloo.svg" onClick={() => router.push('/')} sx={{ cursor: 'pointer' }} />
            </Stack>
            {/* <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ flex: 1 }}>
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
            </Stack> */}
            <Stack sx={{ width: '40%' }}>
            <Autocomplete size="small" disablePortal options={assetOption}
            renderInput={(e) =>
              <TextField color='success' variant="filled" {...e} fullWidth label='Search for Assets' />
             } />
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
          <Stack direction="row">

          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
