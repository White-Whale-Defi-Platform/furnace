'use client'
import { PageLayout, DashboardLayout } from '@/components'

const Page = (): JSX.Element => {
  return (
    <PageLayout title="Furnace" >
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page