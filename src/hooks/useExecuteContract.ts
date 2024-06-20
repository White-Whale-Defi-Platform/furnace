import type { ExecuteMsg } from '@/types'
import { createMsgExecuteContract } from '@/util'
import type { Coin } from '@cosmjs/stargate'
import { useBroadcastTransaction, type UseBroadcastTransactionResult } from './useBroadcastTransaction'
import { useChainContext } from './useChainContext'
import type { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { ENDPOINTS, type ChainName } from '@/constants'
import { useSignTransaction, useSimulateTransaction } from '@/hooks'
import { chains } from 'chain-registry'
export interface UseExecuteContractResult {
  sign: (gas: number) => Promise<TxRaw>
  broadcast: UseBroadcastTransactionResult
  simulate: () => Promise<number | undefined>
}

export const useExecuteContract = <T>(chainName: ChainName, message: ExecuteMsg<T>, coins: Coin[]): UseExecuteContractResult => {
  const { data, isConnected } = useChainContext(chainName)
  const bech32Address = data?.bech32Address
  const signTransaction = useSignTransaction(chainName)
  const broadcastTransaction = useBroadcastTransaction(chainName)
  const simulateTransaction = useSimulateTransaction(chainName)
  const memo = 'Furnace'
  return {
    sign: async (gas: number) => {
      const feeToken = chains.find(({ chain_name: chain }) => chain === chainName)?.fees?.fee_tokens[0]
      if (!isConnected || bech32Address === undefined || feeToken === undefined) return await Promise.reject(new Error('Signer not found'))

      return await signTransaction(
        bech32Address,
        [createMsgExecuteContract<T>(
          bech32Address,
          ENDPOINTS[chainName].contractAddress,
          message,
          coins
        )],
        {
          amount: [{
            amount: (feeToken.average_gas_price ?? 1).toString(),
            denom: feeToken.denom,
          }],
          gas: gas.toString(),
        },
        memo
      )
    },
    broadcast: broadcastTransaction,
    simulate: async () => {
      if (!isConnected || bech32Address === undefined) return await Promise.reject(new Error('Signer not found'))
      return await simulateTransaction(
        bech32Address,
        [createMsgExecuteContract<T>(
          bech32Address,
          ENDPOINTS[chainName].contractAddress,
          message,
          coins
        )],
        memo
      )
    },
  }
}
