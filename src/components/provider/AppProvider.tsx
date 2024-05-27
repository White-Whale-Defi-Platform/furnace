'use client'
import type { FC, PropsWithChildren } from 'react'
import { useAllCosmWasmClients } from '@/hooks'
import { RecoilLoadable } from 'recoil'

export const AppProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  useAllCosmWasmClients()
  return <>{children}</>
}
