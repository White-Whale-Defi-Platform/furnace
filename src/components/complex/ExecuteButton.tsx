'use client'
import { useChainContext, type UseExecuteContractResult } from '@/hooks'
import { Button, CircularProgress } from '@mui/material'
import { type FC, useState } from 'react'
import { TransactionModal } from '@/components/modals'
import { useModal } from '../provider/ModalProvider'
import { useSnackbar } from '../provider/SnackbarProvider'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

export interface ExecuteButtonProps extends UseExecuteContractResult {
  chainName: string
  action: string
  disabled?: boolean
}

export const ExecuteButton: FC<ExecuteButtonProps> = ({ chainName, action, disabled, simulate, sign, broadcast }): JSX.Element => {
  const [loading, setLoading] = useState(false)

  const { isWalletConnected } = useChainContext(chainName)
  const modal = useModal()
  const snackbar = useSnackbar()

  const execute = (): void => {
    setLoading(true)
    snackbar.open('Simulating', 'info')
    simulate().then(
      gas => {
        snackbar.open('Signing', 'info')
        sign(gas === undefined ? 1_000_000 : gas * 1.2)
          .then(tx => {
            snackbar.open('Broadcasting...', 'info')
            broadcast(TxRaw.encode(tx).finish())
              .then(response => modal.open(<TransactionModal {...response} />))
              .catch(() => snackbar.open('Broadcast Failed', 'error'))
              .finally(() => setLoading(false))
          })
          .catch(() => {
            setLoading(false)
            snackbar.open('Request Rejected', 'error')
          })
      }).catch(() => {
      setLoading(false)
      snackbar.open('Simulation Failed', 'error')
    })
  }

  return (
    <Button
      variant="contained"
      onClick={execute}
      disabled={disabled ?? !isWalletConnected}
      size="large"
      sx={{ width: 256 }}
    >
      {loading
        ? <CircularProgress color='inherit' size={26} />
        : isWalletConnected ? action : 'Connect Wallet'}
    </Button>
  )
}
