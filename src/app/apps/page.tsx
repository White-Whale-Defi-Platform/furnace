'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Apps, AppCategories } from '@/constants'
import { useModal } from '@/components'
import { PageLayout } from '@/components/complex/PageLayout'
import { LeaveWebsiteModal } from '@/components/modals/LeaveWebsiteModal'
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, Grid, Link, Stack, Typography } from '@mui/material'

const Page = (): JSX.Element => {
  const router = useRouter()
  const modal = useModal()
  const [selectedCategory, setSelectedCategory] = useState<AppCategories>(AppCategories.All)

  return (
    <PageLayout title="Apps" subtitle="Feel Migaloo at your fingertips">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" gap={1} maxWidth={300}>
            {
              Object
                .values(AppCategories)
                .map((category, i) => (
                  <Chip
                    key={i}
                    variant="outlined"
                    label={category}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    onClick={() => setSelectedCategory(category)} />
                ))
            }
          </Stack>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {
            Array.from(Apps.values())
              .filter(({ category }) => selectedCategory === AppCategories.All || selectedCategory === category)
              .map((app, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Card>
                    <CardHeader
                      title={
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography>{app.name}</Typography>
                          <Chip size="small" variant="filled" color={app.href.internal === '' ? 'default' : 'primary'} label={app.category} />
                        </Stack>
                      }
                      subheader={
                        <Link color="inherit" sx={{ cursor: 'pointer' }} onClick={() => modal.open(<LeaveWebsiteModal url={app.href.external} />)}>
                          {app.creator}
                        </Link>
                      }
                      avatar={
                        <Avatar src={app.logo} />
                      }
                    />
                    <CardActionArea
                      onClick={() => app.href.internal === '' ? modal.open(<LeaveWebsiteModal url={app.href.external} />) : router.push(app.href.internal)}
                    >
                      <CardMedia
                        component="img"
                        image={app.banner}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {app.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
          }
        </Grid>
      </Grid>
    </PageLayout >
  )
}

export default Page
