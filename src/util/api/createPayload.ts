import type { Payload } from '@/types'

// Todo: Comment
export const createPayload = <T>({ payload }: Payload<T>): string => btoa(JSON.stringify(payload))
