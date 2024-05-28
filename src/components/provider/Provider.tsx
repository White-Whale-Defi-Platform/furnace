'use client'
import type { FC, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { darkTheme } from '@/constants'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { osmosis, chihuahua } from 'graz/chains'
import { GrazProvider, WalletType } from 'graz'
import { SnackbarProvider, ModalProvider, AppProvider } from '@/components'

const queryClient = new QueryClient()

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const chihuahua_chain = {
    ...chihuahua,
    rpc: 'https://chihuahua-rpc.polkachu.com',
    rest: 'https://rest.cosmos.directory/chihuahua'
  }
  const osmosis_chain = {
    ...osmosis,
    rpc: 'https://osmosis-rpc.polkachu.com',
    rest: 'https://rest.cosmos.directory/osmosis'
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ModalProvider>
            <SnackbarProvider>
              <GrazProvider
                grazOptions={{
                  chains: [osmosis_chain, chihuahua_chain],
                  defaultWallet: WalletType.KEPLR
                }}
              >
                <AppProvider>{children}</AppProvider>
              </GrazProvider>
            </SnackbarProvider>
          </ModalProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
