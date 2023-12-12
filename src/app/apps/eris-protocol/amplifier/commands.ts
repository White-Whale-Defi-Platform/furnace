import type { ExecuteMsg } from '@/types'
import { createExecuteMsg } from '@/util'

// Bond
export interface BondExecuteMsg {
  bond: Record<string, never>
}

export const createBondExecuteMsg = (): ExecuteMsg<BondExecuteMsg> => createExecuteMsg<BondExecuteMsg>({ bond: {} })

// Unbond
export interface UnbondExecuteMsg {
  queue_unbond: Record<string, never>
}

export const createUnbondExecuteMsg = (): ExecuteMsg<UnbondExecuteMsg> => createExecuteMsg<UnbondExecuteMsg>({ queue_unbond: {} })

// Withdraw
export interface WithdrawExecuteMsg {
  withdraw_unbonded: Record<string, never>
}

export const createWithdrawExecuteMsg = (): ExecuteMsg<WithdrawExecuteMsg> => createExecuteMsg<WithdrawExecuteMsg>({ withdraw_unbonded: {} })
