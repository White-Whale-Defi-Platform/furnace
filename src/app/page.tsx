'use client'
import { PageLayout, DashboardLayout } from '@/components'

const Page = (): JSX.Element => {
  return (
    <PageLayout title="Home">
      <DashboardLayout />
    </PageLayout>
  )
}

export default Page
