'use client'
import { useRouter } from 'next/navigation'
import { useModal, PageLayout, DashboardLayout } from '@/components'
import { useAllSigningCosmWasmClient } from '@/hooks'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()
  useAllSigningCosmWasmClient()

  return (
    <PageLayout title="Furnace" >
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page
