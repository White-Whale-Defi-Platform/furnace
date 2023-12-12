'use client'
import { StakeTabPanel, UnstakeTabPanel, WithdrawPanelTab } from './components'
import { TabCard } from '@/components'
import { Grid } from '@mui/material'
import { PageLayout } from '@/components/complex/PageLayout'
import { AppNames, Apps } from '@/constants'

const info = Apps.get(AppNames.Gravedigger)

const tabs = [
  { label: 'Stake', element: <StakeTabPanel /> },
  { label: 'Unstake', element: <UnstakeTabPanel /> },
  { label: 'Withdraw', element: <WithdrawPanelTab /> }
]

const Gravedigger = (): JSX.Element => (
  <PageLayout
    title={info?.name}
    subtitle={info?.description}
  >
    <Grid
      container
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
      >
        <TabCard tabs={tabs} />
      </Grid>
    </Grid>
  </PageLayout>
)
export default Gravedigger
