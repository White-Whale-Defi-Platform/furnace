import type { DeliverTxResponse } from '@cosmjs/stargate'
import { useSigningClient } from './useSigningCosmWasmClient'
import type { ChainName } from '@/constants'

export type UseBroadcastTransactionResult = (tx: Uint8Array, timeoutMs?: number | undefined, pollIntervalMs?: number | undefined) => Promise<DeliverTxResponse>

export const useBroadcastTransaction = (chainName: ChainName): UseBroadcastTransactionResult => {
  const { result: client } = useSigningClient(chainName)
  const broadcast = async (tx: Uint8Array, timeoutMs?: number | undefined, pollIntervalMs?: number | undefined): Promise<DeliverTxResponse> => {
    if (client === null) return await Promise.reject(new Error('Client not found'))
    return await client.client.broadcastTx(tx, timeoutMs, pollIntervalMs)
  }
  return broadcast
}
