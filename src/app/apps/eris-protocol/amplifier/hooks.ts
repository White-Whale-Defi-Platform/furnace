import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'
import { createBondExecuteMsg, createUnbondExecuteMsg, createWithdrawExecuteMsg } from './commands'
import { Contracts } from './constants'

export const useExecuteBond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createBondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

export const useExecuteUnbond = (id: string, amount: number): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createUnbondExecuteMsg(),
  [{ denom: id, amount: amount.toString() }]
)

export const useExecuteWithdraw = (): UseExecuteContractResult => useExecuteContract(
  Contracts.Amplifier.Whale,
  createWithdrawExecuteMsg(),
  []
)
