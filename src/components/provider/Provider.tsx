'use client'
import type { FC, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { ChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets as keplr } from '@cosmos-kit/keplr-extension'
import { darkTheme, ENDPOINTS } from '@/constants'

import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from './SnackbarProvider'
import { ModalProvider } from './ModalProvider'
import { AppProvider } from './AppProvider'
import { UserProvider } from './UserProvider'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Todo: Comment
export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ModalProvider>
            <SnackbarProvider>
              <ChainProvider
                chains={chains}
                assetLists={assets}
                disableIframe
                wallets={[...keplr]} // Hack: Cosmos Kit is broken; just use one wallet.
                walletModal={() => <></>} // Hack: Cosmos Kit is broken; use internal modal manager.
                endpointOptions={{
                  isLazy: true,
                  endpoints: ENDPOINTS
                }}
              >
                <AppProvider>
                  <UserProvider>
                    {children}
                  </UserProvider>
                </AppProvider>
              </ChainProvider>
            </SnackbarProvider>
          </ModalProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
