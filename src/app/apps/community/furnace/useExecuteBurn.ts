import type { ExecuteMsg } from '@/types'
import { createExecuteMsg, selectAssetByName } from '@/util'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'
import { ENDPOINTS } from '@/constants'

// Burn
export interface BurnExecuteMsg {
  burn: Record<string, never>
}

export const createBurnExecuteMsg = (): ExecuteMsg<BurnExecuteMsg> => createExecuteMsg<BurnExecuteMsg>({ burn: {} })

export const useExecuteBurn = (chainName: string, amount: number, fuelDenom: string): UseExecuteContractResult => {
  return useExecuteContract(
    chainName,
    createBurnExecuteMsg(),
    [{ denom: fuelDenom, amount: amount.toString() }]
  )
}
