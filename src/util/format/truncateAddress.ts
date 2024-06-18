import { bech32 } from 'bech32'

export const truncateAddress = (address: string): string => {
  try {
    // if this doesn't throw an error then we have a valid bech32 address
    bech32.decode(address)
    return `${address.substring(0, address.indexOf('1') + 1)}...${address.substring(address.length - 8, address.length)}`
  }
  catch {
    // an error was thrown so it wasn't an address. just return the string directly
    return address
  }
}
