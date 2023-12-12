'use client'
import React, { useState } from 'react'
import { calculateProgress, formatAmount, isValidTokenInput, formatUnixTime, selectAssetByName } from '@/util'
import { useRecoilValue } from 'recoil'
import { selectUserAsset } from '@/state'
import { backboneLabsAtom } from './state'
import { Card, CardActions, CardContent, CardHeader, Stack, Typography, LinearProgress } from '@mui/material'
import { AssetInput, ExecuteButton } from '@/components'
import { useExecuteBond, useExecuteUnbond, useExecuteWithdraw } from './hooks'

export const StakeTabPanel = (): JSX.Element => {
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const boneWhale = useRecoilValue(selectUserAsset('boneWhale'))
  const { state: { gravedigger: { exchangeRate } } } = useRecoilValue(backboneLabsAtom)
  const [input, setInput] = useState('')
  const output = input === '' ? '' : (Number(input) / exchangeRate).toFixed(6)
  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }
  const executeContract = useExecuteBond(whale.id, Number(input) * Math.pow(10, whale.decimals))
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, whale.decimals)) <= whale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Stake' : 'Invalid Input'

  return (
    <Card>
      <CardHeader
        title="Stake"
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
            asset={boneWhale}
            value={output}
            label="Output"
            disabled={true}
            helperText={`Available: ${formatAmount(boneWhale)}`}
          />
          <CardActions>
            <ExecuteButton
              action={action}
              disabled={!canExecute}
              {...executeContract}
            />
          </CardActions>
        </Stack>
      </CardContent>
    </Card >
  )
}

export const UnstakeTabPanel = (): JSX.Element => {
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const boneWhale = useRecoilValue(selectUserAsset('boneWhale'))
  const { state: { gravedigger: { exchangeRate } } } = useRecoilValue(backboneLabsAtom)

  const [input, setInput] = useState('')
  const output = input === '' ? '' : (Number(input) * exchangeRate).toFixed(6)

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }

  const executeContract = useExecuteUnbond(boneWhale.id, Number(input) * 1_000_000)
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, boneWhale.decimals)) <= boneWhale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Unstake' : 'Invalid Input'

  return (
    <Card>
      <CardHeader
        title="Unstake"
      />
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <AssetInput
            asset={boneWhale}
            value={input}
            label="Input"
            onChange={onChange}
            helperText={`Available: ${formatAmount(boneWhale)}`}
          />
          <AssetInput
            asset={whale}
            value={output}
            label="Output"
            disabled={true}
            helperText={`Available: ${formatAmount(whale)}`}
          />
          <CardActions>
            <ExecuteButton
              action={action}
              disabled={!canExecute}
              {...executeContract}
            />
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  )
}

export const WithdrawPanelTab = (): JSX.Element => {
  const assetInfo = selectAssetByName('Whale')
  const { state: { gravedigger: { unbondings } } } = useRecoilValue(backboneLabsAtom)

  const now = Date.now() / 1_000
  const withdrawable = unbondings.filter(({ end }) => now >= end).reduce((sum, { amount }) => sum + amount, 0)
  const canExecute = withdrawable > 0

  const executeContract = useExecuteWithdraw()
  const action = withdrawable > 0 ? 'Withdraw' : 'Nothing to withdraw'

  return (
    <Card>
      <CardHeader
        title="Withdraw"
      />
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
        >
          {
            [...unbondings]
              .sort((a, b) => a.end - b.end)
              .map(({ amount, start, end }, i) => (
                <Stack
                  key={i}
                  direction="column"
                  width='100%'
                >
                  <LinearProgress

                    variant={start > end ? 'indeterminate' : 'determinate'}
                    color="primary"
                    sx={theme => ({ width: '100%', height: theme.spacing(1) })}
                    value={calculateProgress(start, end, now)}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      fontSize="small"
                      color="text.secondary"
                    >
                      {`${formatUnixTime(start)}`}
                    </Typography>
                    <Typography
                      fontSize="small"
                      color="text.secondary"
                    >
                      {`${formatAmount({ ...assetInfo, amount })} WHALE`}
                    </Typography>
                    <Typography
                      fontSize="small"
                      color="text.secondary"
                    >
                      {`${formatUnixTime(end)}`}
                    </Typography>
                  </Stack>
                </Stack>
              ))
          }
          <CardActions>
            <ExecuteButton
              action={action}
              disabled={!canExecute}
              {...executeContract}
            />
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  )
}
