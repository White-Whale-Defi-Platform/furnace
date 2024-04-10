'use client'
import React, { useState } from 'react'
import { CardActions, CardContent, CardHeader, Grid, Stack, Card } from '@mui/material'
import { formatAmount, isValidTokenInput } from '@/util'
import { useRecoilValue } from 'recoil'
import { selectUserAsset } from '@/state'
import { AssetInput, ExecuteButton } from '@/components'
import { PageLayout } from '@/components/complex/PageLayout'
import { AppNames, Apps } from '@/constants'
import { useExecuteBurn } from '../../apps/community/furnace/commands'

const info = Apps.get(AppNames.Furnace)

const Burn = ({ params }: {
  params: {
    chain: string
    burnedAsset: string
  }
}): JSX.Element => {
  const [input, setInput] = useState('')
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const ash = useRecoilValue(selectUserAsset('Ash'))
  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }
  const executeBurn = useExecuteBurn(Number(input) * Math.pow(10, whale.decimals))
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, whale.decimals)) <= whale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'

  // const selectedFurnace = useQueryingChainAssets(params.chain, params.burnedAsset)

  // if (selectedFurnace === undefined) return <>Loading</>

  return (
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
          container
          maxWidth={512}
        >
          <Grid
            item
            xs={12}
          >
            <Card>
              <CardHeader
                title="Burn"
              />
              <CardContent>
                <Stack
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  <AssetInput
                    asset={whale}
                    value={input}
                    label="Input"
                    onChange={onChange}
                    helperText={`Available: ${formatAmount(whale)}`}
                  />
                  <AssetInput
                    asset={ash}
                    value={input}
                    label="Output"
                    disabled={true}
                    helperText={`Available: ${formatAmount(ash)}`}
                  />
                  <CardActions>
                    <ExecuteButton
                      action={action}
                      disabled={!canExecute}
                      {...executeBurn}
                    />
                  </CardActions>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default Burn
