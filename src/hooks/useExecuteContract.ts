import type { ExecuteMsg } from '@/types'
import { createMsgExecuteContract } from '@/util'
import type { Coin } from '@cosmjs/stargate'
import { useBroadcastTransaction, type UseBroadcastTransactionResult } from './useBroadcastTransaction'
import { useChainContext } from './useChainContext'
import { useSignTransaction } from './useSignTransaction'
import type { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { useSimulateTransaction } from './useSimulateTransaction'

// Todo: Comment
export interface UseExecuteContractResult {
  sign: (gas: number) => Promise<TxRaw>
  broadcast: UseBroadcastTransactionResult
  simulate: () => Promise<number | undefined>
}
// Todo: Comment
export const useExecuteContract = <T>(contract: string, message: ExecuteMsg<T>, coins: Coin[]): UseExecuteContractResult => {
  const { isWalletConnected, address } = useChainContext()
  const signTransaction = useSignTransaction()
  const broadcastTransaction = useBroadcastTransaction()
  const simulateTransaction = useSimulateTransaction()

  const memo = 'Migaloo Command'

  return {
    sign: async (gas: number) => {
      if (!isWalletConnected || address === undefined) return await Promise.reject(new Error('Signer not found'))
      return await signTransaction(
        address,
        [createMsgExecuteContract<T>(
          address,
          contract,
          message,
          coins
        )],
        {
          amount: [{
            denom: 'uwhale',
            amount: '1'
          }],
          gas: gas.toString()
        },
        memo
      )
    },
    broadcast: broadcastTransaction,
    simulate: async () => {
      if (!isWalletConnected || address === undefined) return await Promise.reject(new Error('Signer not found'))
      return await simulateTransaction(
        address,
        [createMsgExecuteContract<T>(
          address,
          contract,
          message,
          coins
        )],
        memo
      )
    }
  }
}
