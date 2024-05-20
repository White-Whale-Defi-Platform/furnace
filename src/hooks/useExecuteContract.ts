import type { ExecuteMsg } from '@/types'
import { createMsgExecuteContract } from '@/util'
import type { Coin } from '@cosmjs/stargate'
import { useBroadcastTransaction, type UseBroadcastTransactionResult } from './useBroadcastTransaction'
import { useChainContext } from './useChainContext'
import { useSignTransaction } from './useSignTransaction'
import type { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { useSimulateTransaction } from './useSimulateTransaction'
import { ENDPOINTS, type ChainName } from '@/constants'
export interface UseExecuteContractResult {
  sign: (gas: number) => Promise<TxRaw>
  broadcast: UseBroadcastTransactionResult
  simulate: () => Promise<number | undefined>
}

export const useExecuteContract = <T>(chainName: ChainName, message: ExecuteMsg<T>, coins: Coin[]): UseExecuteContractResult => {
  const { isWalletConnected, address } = useChainContext(chainName)
  const signTransaction = useSignTransaction(chainName)
  const broadcastTransaction = useBroadcastTransaction(chainName)
  const simulateTransaction = useSimulateTransaction(chainName)

  const memo = 'Furnace'

  return {
    sign: async (gas: number) => {
      if (!isWalletConnected || address === undefined) return await Promise.reject(new Error('Signer not found'))
      return await signTransaction(
        address,
        [createMsgExecuteContract<T>(
          address,
          ENDPOINTS[chainName].contractAddress,
          message,
          coins
        )],
        {
          amount: [{
            denom,
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
          ENDPOINTS[chainName].contractAddress,
          message,
          coins
        )],
        memo
      )
    }
  }
}
