'use client'
import type { FC, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { ENDPOINTS, darkTheme } from '@/constants'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { GrazProvider, WalletType } from 'graz'
import * as grazChains from 'graz/chains'
import { SnackbarProvider, ModalProvider, AppProvider } from '@/components'

const queryClient = new QueryClient()

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const chains = Object.entries(ENDPOINTS)
    .filter(([chainName]) =>
    // @ts-expect-error module type defaults to any
      grazChains[chainName] != null)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map(([chainName, { rpc: [rpc], rest: [rest] }]) => ({
    // @ts-expect-error module type definition doesn't like us throwing a random string in it so we added a filter to ensure everything doesn't blow up
      ...grazChains[chainName], rpc, rest
    }))

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ModalProvider>
            <SnackbarProvider>
                <GrazProvider
                  grazOptions={{
                    chains,
                    defaultWallet: WalletType.KEPLR
                  }}
                >
                  <AppProvider>
                    {children}
                  </AppProvider>
                </GrazProvider>
            </SnackbarProvider>
          </ModalProvider>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
