import { EXPLORER_URL } from './constants'

// Todo: Comment
export const exploreAccount = (address: string): string => `${EXPLORER_URL}/account/${address}`
