'use client'
import type { FC, PropsWithChildren } from 'react'
import { useAllCosmWasmClients } from '@/hooks'

export const AppProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  useAllCosmWasmClients()
  return <>{children}</>
}
