import type { Asset } from '@/types'

export interface AssetInfo {
  id: string
  name: string
  decimals: number
  logo: string
  description: {
    short: string
    long: string
  }
}

const createAsset = (name: string, logo: string, decimals: number, id: string): Asset => ({ name, id, decimals, logo: `/assets/${logo}`, amount: 0, description: { short: '', long: '' } })

export const ASSETS: Asset[] = [
  // Whale
  createAsset(
    'Whale',
    'whale.svg',
    6,
    'uwhale'
  ),
  createAsset('boneWhale', 'boneWhale.png', 6, 'factory/migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u/boneWhale'),
  createAsset('ampWhale', 'ampWhale.svg', 6, 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE'),
  createAsset('Ash', 'ash.svg', 6, 'factory/migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup/ash'),
  // USDC
  createAsset('Usdc', 'usdc.svg', 6, 'ibc/BC5C0BAFD19A5E4133FDA0F3E04AE1FBEE75A4A226554B2CBB021089FF2E1F8A'),
  // Rac
  createAsset('Rac', 'rac.png', 6, 'factory/migaloo1eqntnl6tzcj9h86psg4y4h6hh05g2h9nj8e09l/urac'),
  createAsset('Unknown', 'whale.svg', 1, 'unknown')
]
