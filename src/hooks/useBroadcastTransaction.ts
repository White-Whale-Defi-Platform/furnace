import type { DeliverTxResponse } from '@cosmjs/stargate'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'

// Todo: Comment
export type UseBroadcastTransactionResult = (tx: Uint8Array, timeoutMs?: number | undefined, pollIntervalMs?: number | undefined) => Promise<DeliverTxResponse>

// Todo: Comment
export const useBroadcastTransaction = (chainName: string): UseBroadcastTransactionResult => {
  const { result: client } = useSigningCosmWasmClient(chainName)
  const broadcast = async (tx: Uint8Array, timeoutMs?: number | undefined, pollIntervalMs?: number | undefined): Promise<DeliverTxResponse> => {
    if (client === null) return await Promise.reject(new Error('Client not found'))
    return await client.broadcastTx(tx, timeoutMs, pollIntervalMs)
  }
  return broadcast
}
