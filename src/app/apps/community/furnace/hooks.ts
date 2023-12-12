import { useExecuteContract, type UseExecuteContractResult } from '@/hooks'
import { selectAssetByName } from '@/util'
import { createBurnExecuteMsg } from './commands'
import { Contracts } from './constants'

export const useExecuteBurn = (amount: number): UseExecuteContractResult => {
  const whale = selectAssetByName('Whale')

  return useExecuteContract(
    Contracts.Furnace,
    createBurnExecuteMsg(),
    [{ denom: whale.id, amount: amount.toString() }]
  )
}
