'use client'
import type { FC, PropsWithChildren } from 'react'
import { useAllCosmWasmClients } from '@/hooks'

// Todo: Comment
export const AppProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  useAllCosmWasmClients()

  // const setApp = useSetRecoilState(appAtom)
  // const heightFetch = useFetchHeight()

  // useEffect(
  //   () => {
  //     setApp(current => ({
  //       state: { ...current.state, height: heightFetch.result },
  //       loading: heightFetch.loading,
  //       error: heightFetch.error
  //     }))
  //   },
  //   [heightFetch, setApp]
  // )

  return <>{children}</>
}
