'use client'
import type { UseExecuteContractResult } from '@/hooks'
import { Button, CircularProgress } from '@mui/material'
import { type FC, useState } from 'react'
import { TransactionModal } from '@/components/modals'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import type { ChainName } from '@/constants'
import { useModal, useSnackbar } from '../provider'

interface ExecuteButtonProps extends UseExecuteContractResult {
  action: string
  disabled?: boolean
  chainName: ChainName
}

export const ExecuteButton: FC<ExecuteButtonProps> = ({
  action,
  disabled,
  simulate,
  sign,
  broadcast,
  chainName,
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const modal = useModal()
  const snackbar = useSnackbar()

  const execute = (): void => {
    setLoading(true)
    snackbar.open('Simulating', 'info')
    simulate()
      .then((gas) => {
        snackbar.open('Signing', 'info')
        sign(Math.ceil(gas === undefined ? 1_000_000 : gas * 1.2))
          .then((tx) => {
            snackbar.open('Broadcasting...', 'info')
            broadcast(TxRaw.encode(tx).finish())
              .then((response) => {
                modal.open(
                  <TransactionModal
                    deliveryTxResp={response}
                    chainName={chainName}
                  />
                )
              }
              )
              .catch(() => { snackbar.open('Broadcast Failed', 'error') })
              .finally(() => { setLoading(false) })
          })
          .catch((_) => {
            setLoading(false)
            snackbar.open('Request Rejected', 'error')
          })
      })
      .catch((e) => {
        setLoading(false)
        console.error('Simulation Failure', e)
        snackbar.open('Simulation Failed', 'error')
      })
  }

  return (
    <Button
      variant="contained"
      onClick={() => { execute() }}
      disabled={disabled}
      size="large"
      sx={{ width: 256, border: 'none' }}
    >
      {loading ? <CircularProgress color="inherit" size={26} /> : action}
    </Button>
  )
}
