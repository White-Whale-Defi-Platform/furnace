import { chains } from 'chain-registry'

export const formatPrettyName = (chainName: string): string => chains.find(({ chain_name: chainListName }) => chainListName === chainName)?.pretty_name ?? chainName
