'use client'
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { isValidTokenInput } from '@/util'
import { useRecoilValue } from 'recoil'
import { selectUserAsset } from '@/state'
import { PageLayout } from '@/components/complex/PageLayout'
import { ENDPOINTS } from '@/constants'
import { useRouter } from 'next/navigation'
import Burner from '@/components/burner/Burner'
import { LeaderboardLayout } from '@/components/leaderboard/LeaderboardLayout'
import { useExecuteBurn } from '@/hooks'

const Burn = ({ params }: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const { chain, burnedAsset } = params
  const router = useRouter()

  const [input, setInput] = useState('')
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const ash = useRecoilValue(selectUserAsset('Ash'))
  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }
  const executeBurn = useExecuteBurn(Number(input) * Math.pow(10, whale.decimals))
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, whale.decimals)) <= whale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'

  useEffect(() => {
    if (!ENDPOINTS[chain] || !['whale', 'guppy', 'huahua'].includes(burnedAsset)) { router.push('/') }
  }, [chain, burnedAsset, router])

  return (
    <PageLayout title={`${params.burnedAsset.toUpperCase()} Furnace`} subtitle={`Burn ${params.burnedAsset} and Receive`}>
      <Grid container direction={'column'} alignItems='center' justifyContent='center' gap={5} >
        <Burner nativeAsset={whale} mintAsset={ash} input={input} onChange={onChange} />
        <LeaderboardLayout />
      </Grid>
    </PageLayout>
  )
}

export default Burn
