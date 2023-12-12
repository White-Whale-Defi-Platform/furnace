'use client'
import { type FC, useEffect, type PropsWithChildren } from 'react'
import { useSetRecoilState } from 'recoil'
import { appAtom } from '@/state'
import { useFetchHeight } from '@/hooks'

// Todo: Comment
export const AppProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const setApp = useSetRecoilState(appAtom)
  const heightFetch = useFetchHeight()

  useEffect(
    () => {
      setApp(current => ({
        state: { ...current.state, height: heightFetch.result },
        loading: heightFetch.loading,
        error: heightFetch.error
      }))
    },
    [heightFetch, setApp]
  )

  return <>{children}</>
}
