'use client'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Stack
} from '@mui/material'
import React, { type FC } from 'react'
import { AssetInput, ExecuteButton } from '../complex'
import { formatAssetAmount } from '@/util'
import type { Asset } from '@/types'
import { useChainContext, type UseExecuteContractResult } from '@/hooks'

interface Props {
  nativeAsset: Asset
  mintAsset: Asset
  onChange: (displayAmount: string) => void
  burnDisplayAmount: string
  disabled: boolean
  chainName: string
  executeBurn?: UseExecuteContractResult
}

export const BurnerForm: FC<Props> = ({
  burnDisplayAmount,
  nativeAsset,
  mintAsset,
  onChange,
  disabled,
  chainName,
  executeBurn
}) => {
  const { isConnected } = useChainContext(chainName)
  const canExecute =
    Number(burnDisplayAmount) > 0 &&
    Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals) <=
      nativeAsset.amount

  const action = !isConnected
    ? 'Connect Wallet'
    : burnDisplayAmount === ''
      ? 'Enter Input'
      : canExecute
        ? 'Burn'
        : 'Invalid Input'
  return (
    <Grid
      container
      justifyContent="center"
      minHeight="65vh"
      direction="column"
    >
      <Grid alignSelf='center' sx={{ minWidth: '40vw' }}>
        <Card sx={{ bgcolor: '#2B2626', border: 'none' }}>
          <CardHeader title="Burn" />
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <AssetInput
                invalidAmount={!canExecute}
                asset={nativeAsset}
                prefillClick={() => onChange(formatAssetAmount(nativeAsset))}
                value={burnDisplayAmount}
                label="You Burn"
                onChange={(e) => onChange(e.target.value)}
                helperText={`Available: ${formatAssetAmount(nativeAsset)}`}
                disabled={!isConnected}
              />
              <AssetInput
                asset={mintAsset}
                value={burnDisplayAmount}
                label="You Get"
                disabled={true}
                helperText={`Available: ${formatAssetAmount(mintAsset)}`}
              />
              <CardActions>
                {executeBurn != null
                  ? (
                  <ExecuteButton
                    chainName={chainName}
                    action={action}
                    disabled={disabled || !isConnected}
                    {...executeBurn}
                  />
                    )
                  : (
                  <Button
                    variant="contained"
                    disabled
                    size="large"
                    sx={{ width: 256, border: 'none' }}
                  >
                    <CircularProgress color="inherit" size={26} />
                  </Button>
                    )}
              </CardActions>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BurnerForm
