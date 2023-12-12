import { EXPLORER_URL } from './constants'

// Todo: Comment
export const exploreTx = (hash: string): string => `${EXPLORER_URL}/tx/${hash}`
