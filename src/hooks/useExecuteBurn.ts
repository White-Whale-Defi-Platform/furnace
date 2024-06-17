import type { ExecuteMsg } from '@/types'
import { createExecuteMsg } from '@/util'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'

import type { ChainName } from '@/constants'

// Burn
interface BurnExecuteMsg {
  burn: Record<string, never>
}

const createBurnExecuteMsg = (): ExecuteMsg<BurnExecuteMsg> => createExecuteMsg<BurnExecuteMsg>({ burn: {} })

export const useExecuteBurn = (chainName: ChainName, amount: number, denom: string): UseExecuteContractResult => {
  return useExecuteContract(
    chainName,
    createBurnExecuteMsg(),
    [{ denom, amount: amount.toString() }]
  )
}
