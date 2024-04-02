import { Layout } from '@/components'
import { Provider } from '@/components/provider'
import type { Metadata } from 'next'
import type { PropsWithChildren, FC } from 'react'

export const metadata: Metadata = {
  title: 'Migaloo',
  description: 'Your one stop shop for everything in the Migaloo ecosystem.',
  applicationName: 'Migaloo Command',
  authors: [{ name: 'Migaloo Foundation' }]
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
