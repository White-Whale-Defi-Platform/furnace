import type { EncodeObject } from '@cosmjs/proto-signing'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import type { ChainName } from '@/constants'

export type UseSimulateTransactionResult = (signer: string, messages: EncodeObject[], memo: string) => Promise<number | undefined> | undefined

export const useSimulateTransaction = (chainName: ChainName): UseSimulateTransactionResult => {
  const { result: client } = useSigningCosmWasmClient(chainName)

  return async (signer: string, messages: EncodeObject[], memo: string) => await client?.simulate(signer, messages, memo)
}
