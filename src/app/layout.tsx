import { Layout } from '@/components'
import { Provider } from '@/components/provider'
import type { Metadata } from 'next'
import type { PropsWithChildren, FC } from 'react'

export const metadata: Metadata = {
  title: 'The Furnace',
  description:
    'The Furnace is a dApp that allows coins to be burned and receives a new burn derivative.'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" style={{ width: '100%', minHeight: '100vh' }}>
    <head>
      <link rel="icon" href="/assets/favicon.ico" type="image/ico" />
    </head>
    <body>
      <Provider>
        <Layout>{children}</Layout>
      </Provider>
    </body>
  </html>
)

export default RootLayout
