export const HASH_FORMAT_LENGTH = 4

export const formatHash = (hash: string): string => '...' + hash.slice(hash.length - HASH_FORMAT_LENGTH, hash.length)
