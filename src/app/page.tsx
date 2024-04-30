'use client'
import { useRouter } from 'next/navigation'
import { useModal } from '@/components'
import { PageLayout } from '@/components/complex/PageLayout'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useAllSigningCosmWasmClient, useOsmosisSigningCosmWasmClient } from '@/hooks'
import { useRecoilValue } from 'recoil'
import { clientsAtom } from '@/state'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()
  useAllSigningCosmWasmClient()

  return (
    <PageLayout title="Furnace" subtitle="Burn Whale & Receive Ash">
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page
