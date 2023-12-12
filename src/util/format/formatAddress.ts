import { labelAddress } from './labelAddess'

// Todo: Comment
export const ADDRESS_FORMAT_LENGTH = 4

// Todo: Comment
export const formatAddress = (address: string, label = false): string => {
  if (label) {
    const addressLabel = labelAddress(address)
    if (addressLabel !== undefined) {
      return addressLabel
    }
  }
  return '...' + address.slice(address.length - ADDRESS_FORMAT_LENGTH, address.length)
}
