import type { ExecuteMsg } from '@/types'
import { createExecuteMsg, selectAssetByName } from '@/util'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'

import type { ChainName } from '@/constants'

// Burn
export interface BurnExecuteMsg {
  burn: Record<string, never>
}

export const createBurnExecuteMsg = (): ExecuteMsg<BurnExecuteMsg> => createExecuteMsg<BurnExecuteMsg>({ burn: {} })

export const useExecuteBurn = (chainName: ChainName, amount: number, denom: string): UseExecuteContractResult => {
  return useExecuteContract(
    chainName,
    createBurnExecuteMsg(),
    [{ denom, amount: amount.toString() }]
  )
}
