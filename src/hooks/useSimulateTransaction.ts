import type { EncodeObject } from '@cosmjs/proto-signing'
import { useSigningClient } from './useSigningCosmWasmClient'
import type { ChainName } from '@/constants'

export type UseSimulateTransactionResult = (signer: string, messages: EncodeObject[], memo: string) => Promise<number | undefined> | undefined

export const useSimulateTransaction = (chainName: ChainName): UseSimulateTransactionResult => {
  const { result: client } = useSigningClient(chainName)
  return async (signer: string, messages: EncodeObject[], memo: string) => {
    return await client?.client.simulate(signer, messages, memo)
  }
}