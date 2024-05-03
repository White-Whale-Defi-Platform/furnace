'use client'
import { Card, CardActions, CardContent, CardHeader, Grid, Stack } from '@mui/material'
import React, { type FC } from 'react'
import { AssetInput, ExecuteButton } from '../complex'
import { formatAssetAmount } from '@/util'
import type { Asset } from '@/types'
import { useExecuteBurn } from '@/app/apps/community/furnace/useExecuteBurn'
import type { ChainName } from '@/constants'
import { useChainContext } from '@/hooks'

interface Props {
  nativeAsset: Asset
  mintAsset: Asset
  input: string
  onChange: () => void
  chainName: ChainName
}

export const Burner: FC <Props> = ({ chainName, nativeAsset, mintAsset, onChange, input }) => {
  const executeBurn = useExecuteBurn(chainName, Number(input) * Math.pow(10, nativeAsset.decimals))
  const canExecute = Number(input) !== 0 && (Number(input) * Math.pow(10, nativeAsset.decimals)) <= nativeAsset.amount
  const action = input === '' ? 'Enter Input' : canExecute ? 'Burn' : 'Invalid Input'
  const { isWalletConnected } = useChainContext(chainName)
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
                asset={nativeAsset}
                value={input}
                label="Input"
                onChange={onChange}
                helperText={`Available: ${formatAssetAmount(nativeAsset)}`}
                disabled={!isWalletConnected}
              />
              <AssetInput
                asset={mintAsset}
                value={input}
                label="Output"
                disabled={true}
                helperText={`Available: ${formatAssetAmount(mintAsset)}`}
              />
              <CardActions>
                <ExecuteButton
                isWalletConnected={isWalletConnected}
                chainName={chainName}
                  action={action}
                  disabled={!canExecute && !isWalletConnected}
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
