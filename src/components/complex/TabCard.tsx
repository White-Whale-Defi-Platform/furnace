'use client'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Grid, Stack, Tab } from '@mui/material'
import { type FC, useState } from 'react'

// Todo: Comment
export interface TabCardProps {
  tabs: Array<{ label: string, element: JSX.Element }>
}

// Todo: Comment
export const TabCard: FC<TabCardProps> = ({ tabs }): JSX.Element => {
  const [tab, setTab] = useState(tabs[0].label)

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item container maxWidth={512}>
        <Grid item xs={12}>
          <TabContext value={tab}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <TabList onChange={(_: React.SyntheticEvent, value: string) => setTab(value)}>
                {
                  tabs.map(({ label }, i) => <Tab key={i} label={label} value={label} />)
                }
              </TabList>
            </Stack>
            {
              tabs.map(({ label, element }, i) => <TabPanel sx={{ p: 0 }} key={i} value={label}>{element}</TabPanel>)
            }
          </TabContext>
        </Grid>
      </Grid >
    </Grid >

  )
}
