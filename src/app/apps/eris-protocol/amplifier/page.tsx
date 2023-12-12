'use client'
import { StakeTabPanel, UnstakeTabPanel, WithdrawPanelTab } from './components'
import { TabCard } from '@/components'
import { Grid } from '@mui/material'
import { PageLayout } from '@/components/complex/PageLayout'

const tabs = [
  { label: 'Stake', element: <StakeTabPanel /> },
  { label: 'Unstake', element: <UnstakeTabPanel /> },
  { label: 'Withdraw', element: <WithdrawPanelTab /> }
]

const Amplifier = (): JSX.Element => (
  <PageLayout title='Amplifier' subtitle="Liquid-stake & Amplify yield">
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12} container justifyContent="center">
        <TabCard tabs={tabs} />
      </Grid>
    </Grid>
  </PageLayout>
)

export default Amplifier
