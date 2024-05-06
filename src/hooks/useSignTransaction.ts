import type { StdFee } from '@cosmjs/stargate'
import type { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import type { EncodeObject } from '@cosmjs/proto-signing'
import type { ChainName } from '@/constants'

// Todo: Comment
export type UseSignTransactionResult = (address: string, messages: EncodeObject[], fee: StdFee, memo?: string) => Promise<TxRaw>

// Todo: Comment
export const useSignTransaction = (chainName: ChainName): UseSignTransactionResult => {
  const { result: client } = useSigningCosmWasmClient(chainName)
  const sign = async (address: string, messages: EncodeObject[], fee: StdFee, memo?: string): Promise<TxRaw> => {
    if (client === null) return await Promise.reject(new Error('Client not found'))
    return await client.sign(address, messages, fee, memo ?? 'Migaloo Command')
  }
  return sign
}
