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
  loading?: boolean
  chainName: string
  executeBurn?: UseExecuteContractResult
}

export const BurnerForm: FC<Props> = ({
  burnDisplayAmount,
  nativeAsset,
  mintAsset,
  onChange,
  loading = false,
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
      <Grid xs={12}>
        <Card sx={{ bgcolor: '#2B2626', border: 'none' }}>
          <CardHeader title="Burn" />
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <AssetInput
                invalidAmount={!canExecute && !loading}
                asset={nativeAsset}
                prefillClick={() => onChange(formatAssetAmount(nativeAsset))}
                value={burnDisplayAmount}
                label="You Burn"
                onChange={(e) => onChange(e.target.value)}
                helperText={`Available: ${loading ? '-' : formatAssetAmount(nativeAsset)}`}
                disabled={!isConnected && loading}
                loading={loading}
              />
              <AssetInput
                asset={mintAsset}
                value={burnDisplayAmount}
                label="You Get"
                helperText={`Available: ${loading ? '-' : formatAssetAmount(mintAsset)}`}
                loading={loading}
              />
              <CardActions>
                {executeBurn != null
                  ? (
                  <ExecuteButton
                    chainName={chainName}
                    action={action}
                    disabled={loading || !isConnected}
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
