'use client'

import { AssetInput, ExecuteButton } from '@/components'
import { useExecuteContract } from '@/hooks'
import { selectUserAsset } from '@/state'
import { calculateProgress, formatAmount, formatUnixTime, isValidTokenInput, selectAssetByName } from '@/util'
import { Card, CardActions, CardContent, CardHeader, LinearProgress, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { createBondExecuteMsg, createUnbondExecuteMsg, createWithdrawExecuteMsg } from './commands'
import { Contracts } from './constants'
import { erisProtocolAtom } from './state'

export const StakeTabPanel = (): JSX.Element => {
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const ampWhale = useRecoilValue(selectUserAsset('ampWhale'))
  const { state: { amplifier: { exchangeRate } } } = useRecoilValue(erisProtocolAtom)

  const [input, setInput] = useState('')
  const output = input === '' ? '' : (Number(input) / exchangeRate).toFixed(6)

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }

  const executeContract = useExecuteContract(
    Contracts.Amplifier.Whale,
    createBondExecuteMsg(),
    [{ denom: whale.id, amount: (Number(input) * 1_000_000).toString() }]
  )
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, whale.decimals)) <= whale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Stake' : 'Invalid Input'

  return (
    <Card>
      <CardHeader title="Stake" />
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          gap={2}
        >
          <AssetInput
            asset={whale}
            value={input}
            label="Input"
            onChange={onChange}
            helperText={`Available: ${formatAmount(whale)}`}
          />
          <AssetInput
            asset={ampWhale}
            value={output}
            label="Output"
            disabled={true}
            helperText={`Available: ${formatAmount(ampWhale)}`}
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

export const UnstakeTabPanel = (): JSX.Element => {
  const whale = useRecoilValue(selectUserAsset('Whale'))
  const ampWhale = useRecoilValue(selectUserAsset('ampWhale'))
  const { state: { amplifier: { exchangeRate } } } = useRecoilValue(erisProtocolAtom)

  const [input, setInput] = useState('')
  const output = input === '' ? '' : (Number(input) * exchangeRate).toFixed(6)

  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => { isValidTokenInput(value) && setInput(value) }

  const executeContract = useExecuteContract(
    Contracts.Amplifier.Whale,
    createUnbondExecuteMsg(),
    [{ denom: ampWhale.id, amount: (Number(input) * 1_000_000).toString() }]
  )
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, ampWhale.decimals)) <= ampWhale.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Unstake' : 'Invalid Input'

  return (
    <Card>
      <CardHeader title="Unstake" />
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          gap={2}
        >
          <AssetInput
            asset={ampWhale}
            value={input}
            label="Input"
            onChange={onChange}
            helperText={`Available: ${formatAmount(ampWhale)}`}
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
  const { state: { amplifier: { unbondings } } } = useRecoilValue(erisProtocolAtom)

  const now = Date.now() / 1_000
  const withdrawable = unbondings.filter(({ end }) => now >= end).reduce((sum, { amount }) => sum + amount, 0)
  const canExecute = withdrawable > 0

  const executeContract = useExecuteContract(
    Contracts.Amplifier.Whale,
    createWithdrawExecuteMsg(),
    []
  )

  return (
    <Card>
      <CardHeader title="Withdraw" />
      <CardContent>
        <Stack
          direction="column"
          spacing={2}
        >
          {
            [...unbondings]
              .sort((a, b) => a.end - b.end)
              .map(({ amount, start, end }, i) => (
                <Stack
                  key={i}
                  direction="column"
                >
                  <LinearProgress
                    variant={start > end ? 'indeterminate' : 'determinate'}
                    color="primary" sx={theme => ({ height: theme.spacing(1) })}
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <CardActions>
              <ExecuteButton
                action={canExecute ? 'Withdraw' : 'Nothing to Withdraw'}
                disabled={!canExecute}
                {...executeContract}
              />
            </CardActions>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
