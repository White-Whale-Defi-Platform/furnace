'use client'
import { Card, CardActions, CardContent, CardHeader, Grid, Stack } from '@mui/material'
import React, { useState, type FC } from 'react'
import { AssetInput, ExecuteButton } from '../complex'
import { formatAssetAmount } from '@/util'
import type { Asset } from '@/types'
import type { ChainName } from '@/constants'
import { useExecuteBurn } from '@/hooks'
import { useChain } from '@cosmos-kit/react'

interface Props {
  nativeAsset: Asset
  mintAsset: Asset
  input: string
  onChange: () => void
  chainName: ChainName
}

export const Burner: FC <Props> = ({ chainName, nativeAsset, mintAsset, onChange, input }) => {
  const [burnDisplayAmount, setBurnDisplayAmount] = useState('')
  const executeBurn = useExecuteBurn(chainName,
    Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals),
    nativeAsset.id)
  const canExecute = Number(burnDisplayAmount) !== 0 &&
     (Number(burnDisplayAmount) * Math.pow(10, nativeAsset.decimals)) <= nativeAsset.amount
  const { isWalletConnected } = useChain(chainName)
  const action = !isWalletConnected ? 'Connect Wallet' : burnDisplayAmount === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'

  return (
    <Grid
    container
    alignItems="center"
    justifyContent="center"
    minHeight="65vh"
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
                invalidAmount={!canExecute}
                asset={nativeAsset}
                prefillClick={() => setBurnDisplayAmount(formatAssetAmount(nativeAsset))}
                value={burnDisplayAmount}
                label="You Burn"
                onChange={(e) => setBurnDisplayAmount(e.target.value)}
                helperText={`Available: ${formatAssetAmount(nativeAsset)}`}
                disabled={!isWalletConnected }
              />
              <AssetInput
                asset={mintAsset}
                value={burnDisplayAmount}
                label="You Get"
                disabled={true}
                helperText={`Available: ${formatAssetAmount(mintAsset)}`}
              />
              <CardActions>
                <ExecuteButton
                  isWalletConnected={isWalletConnected}
                  chainName={chainName}
                  action={action}
                  disabled={!canExecute || !isWalletConnected}
                  {...executeBurn}
                />
              </CardActions>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
  )
}

export default Burner
