import { Layout } from '@/components'
import { Provider } from '@/components/provider'
import type { Metadata } from 'next'
import type { PropsWithChildren, FC } from 'react'

export const metadata: Metadata = {
  title: 'Furnace',
  description: 'The Furnace is a dApp which allows coins to be burnt and receives a new burn derivative in its place.'
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
