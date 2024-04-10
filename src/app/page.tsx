'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Apps, AppCategories } from '@/constants'
import { useModal } from '@/components'
import { PageLayout } from '@/components/complex/PageLayout'
import { LeaveWebsiteModal } from '@/components/modals/LeaveWebsiteModal'
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Grid, Link, Stack, Typography } from '@mui/material'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()
  const [selectedCategory, setSelectedCategory] = useState<AppCategories>(AppCategories.All)

  return (
    <PageLayout title="Furnace" subtitle="Burn Whale & Receive Ash">
      <DashboardLayout/>
    </PageLayout >
  )
}

export default Page
