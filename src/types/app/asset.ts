export interface Asset {
  id: string
  name: string
  logo: string | undefined
  amount: number
  decimals: number
  description: {
    short: string
    long: string
  }
}
