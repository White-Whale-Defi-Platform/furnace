import type { ExecuteMsg } from '@/types'
import { createExecuteMsg } from '@/util'
import { Contracts } from './constants'
import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'

// Bond
export interface BondExecuteMsg {
  bond: Record<string, never>
}

export const createBondExecuteMsg = (): ExecuteMsg<BondExecuteMsg> => createExecuteMsg<BondExecuteMsg>({ bond: {} })

export const useExecuteBond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createBondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

// Unbond
export interface UnbondExecuteMsg {
  queue_unbond: Record<string, never>
}

export const createUnbondExecuteMsg = (): ExecuteMsg<UnbondExecuteMsg> => createExecuteMsg<UnbondExecuteMsg>({ queue_unbond: {} })

export const useExecuteUnbond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createUnbondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

// Withdraw
export interface WithdrawExecuteMsg {
  withdraw_unbonded: Record<string, never>
}

export const createWithdrawExecuteMsg = (): ExecuteMsg<WithdrawExecuteMsg> => createExecuteMsg<WithdrawExecuteMsg>({ withdraw_unbonded: {} })

export const useExecuteWithdraw = (): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createWithdrawExecuteMsg(),
  []
)
