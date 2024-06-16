import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material'
import SouthIcon from '@mui/icons-material/South'
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
    <Grid container justifyContent="center" minHeight="65vh" direction="column" alignContent='center'>
      <Grid xs={12} sx={{ width: '570px' }}>
        <Card sx={{ border: 'none' }}>
          <CardHeader title="Burn" />
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
             <>
              <AssetInput
                invalidAmount={!canExecute && !loading}
                asset={nativeAsset}
                prefillClick={() => onChange(formatAssetAmount(nativeAsset))}
                value={burnDisplayAmount}
                label="Enter Amount"
                onChange={(e) => onChange(e.target.value)}
                helperText={`Balance: ${loading ? '-' : formatAssetAmount(nativeAsset)}`}
                disabled={!isConnected && loading}
                loading={loading}
                borderLine
              />
              <Stack direction="row" spacing={1}>
                <SouthIcon fontSize='small' sx={{ alignSelf: 'center' }}/>
                <Typography>1:1</Typography>
                <SouthIcon fontSize='small' sx={{ alignSelf: 'center' }}/>
              </Stack>
              <AssetInput
                asset={mintAsset}
                value={burnDisplayAmount}
                label="Output"
                helperText={`Balance: ${loading ? '-' : formatAssetAmount(mintAsset)}`}
                loading={loading}
                disabled
              />
              </>
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
