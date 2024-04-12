'use client'
import { useRouter } from 'next/navigation'
import { useModal } from '@/components'
import { PageLayout } from '@/components/complex/PageLayout'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()

  return (
    <PageLayout title="Furnace" subtitle="Burn Whale & Receive Ash">
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page
