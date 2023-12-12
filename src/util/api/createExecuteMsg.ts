import type { ExecuteMsg } from '@/types'

export const createExecuteMsg = <T>(msg: T): ExecuteMsg<T> => ({ executeMsg: msg })
