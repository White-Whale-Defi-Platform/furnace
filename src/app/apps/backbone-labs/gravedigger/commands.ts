import type { ExecuteMsg } from '@/types'
import { createExecuteMsg } from '@/util'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'
import { Contracts } from './constants'

// Bond
export interface BondExecuteMsg {
  bond: Record<string, never>
}

export const createBondExecuteMsg = (): ExecuteMsg<BondExecuteMsg> => createExecuteMsg<BondExecuteMsg>({ bond: {} })

export const useExecuteBond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Gravedigger.Whale,
  createBondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

// Unbond
export interface UnbondExecuteMsg {
  unbond: Record<string, never>
}

export const createUnbondExecuteMsg = (): ExecuteMsg<UnbondExecuteMsg> => createExecuteMsg<UnbondExecuteMsg>({ unbond: {} })

export const useExecuteUnbond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Gravedigger.Whale,
  createUnbondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

// Withdraw
export interface WithdrawExecuteMsg {
  withdraw_unbonded: Record<string, never>
}

export const createWithdrawExecuteMsg = (): ExecuteMsg<WithdrawExecuteMsg> => createExecuteMsg<WithdrawExecuteMsg>({ withdraw_unbonded: {} })

export const useExecuteWithdraw = (): UseExecuteContractResult => useExecuteContract(
  Contracts.Gravedigger.Whale,
  createWithdrawExecuteMsg(),
  []
)
