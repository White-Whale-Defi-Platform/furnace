import type { Payload } from '@/types'

export const createPayload = <T>({ payload }: Payload<T>): string => btoa(JSON.stringify(payload))
