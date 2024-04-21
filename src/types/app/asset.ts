export interface Asset {
  id: string
  name: string
  logo: string
  amount: number
  decimals: number
  description: {
    short: string
    long: string
  }
}
