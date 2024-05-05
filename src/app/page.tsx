'use client'
import { useRouter } from 'next/navigation'
import { useModal, PageLayout, DashboardLayout } from '@/components'
import { useAllCosmWasmClients } from '@/hooks'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()
  useAllCosmWasmClients()

  return (
    <PageLayout title="Furnace" >
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page
