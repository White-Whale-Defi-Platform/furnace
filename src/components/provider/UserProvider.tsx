'use client'
import { type FC, useEffect, type PropsWithChildren } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/state'
import { useFetchBalances } from '@/hooks'
import { selectAssetById } from '@/util'

// Todo: Comment
export const UserProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const setUser = useSetRecoilState(userAtom)
  const balances = useFetchBalances()

  useEffect(() => {
    setUser(prev => ({
      ...prev,
      state: {
        assets: balances.result.map(coin => ({
          ...selectAssetById(coin.denom),
          amount: Number(coin.amount)
        }))
      },
      loading: balances.loading,
      error: balances.error
    })
    )
  }, [balances, setUser])

  return <>{children}</>
}
