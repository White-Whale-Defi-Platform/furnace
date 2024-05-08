import { Layout } from '@/components'
import { Provider } from '@/components/provider'
import type { Metadata } from 'next'
import type { PropsWithChildren, FC } from 'react'

export const metadata: Metadata = {
  title: 'Furnace',
  description: 'The Furnace is a dApp which allows coins to be burnt and a new burn derivative to be minted in its place.',
  applicationName: 'Furnace',
  authors: [{ name: 'Furnace' }]
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" style={{ width: '100%', minHeight: '100vh' }}>
    <body >
      <Provider>
        <Layout>
          {children}
        </Layout>
      </Provider>
    </body>
  </html>
)

export default RootLayout
