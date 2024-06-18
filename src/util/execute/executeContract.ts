import { toUtf8 } from '@cosmjs/encoding'
import type { Coin } from '@cosmjs/stargate'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import type { EncodeObject } from '@cosmjs/proto-signing'
import type { ExecuteMsg } from '@/types'

export const createMsgExecuteContract = <T>(senderAddress: string, contractAddress: string, message: ExecuteMsg<T>, funds: Coin[]): EncodeObject => ({
  typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
  value: MsgExecuteContract.fromPartial(
    {
      sender: senderAddress,
      contract: contractAddress,
      msg: toUtf8(JSON.stringify(message.executeMsg)),
      funds: [...funds],
    }
  ),
})
