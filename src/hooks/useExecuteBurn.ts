import type { ExecuteMsg } from '@/types'
import { createExecuteMsg, selectAssetByName } from '@/util'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'

import type { ChainName } from '@/constants'

// Burn
export interface BurnExecuteMsg {
  burn: Record<string, never>
}

export const createBurnExecuteMsg = (): ExecuteMsg<BurnExecuteMsg> => createExecuteMsg<BurnExecuteMsg>({ burn: {} })

export const useExecuteBurn = (chainName: ChainName, amount: number): UseExecuteContractResult => {
  const whale = selectAssetByName('Whale')

  return useExecuteContract(
    chainName,
    createBurnExecuteMsg(),
    [{ denom: whale.id, amount: amount.toString() }]
  )
}
