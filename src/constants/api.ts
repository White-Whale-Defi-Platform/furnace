import { chihuahua, osmosis } from 'graz/chains'

export const FETCH_INTERVAL = 6_000

export type ChainName = string

export const ENDPOINTS: Record<
string,
{ chainId: string, rpc: string[], rest: string[], chainColor: string, explorerUrl: string, contractAddress: string, background:string }
> = {
  chihuahua: {
    // chainInfo: {...chihuahua, rpc: 'https://osmosis-rpc.polkachu.com', rest: 'https://rest.cosmos.directory/chihuahua'},
    chainId: 'chihuahua-1',
    rpc: ['https://chihuahua-rpc.polkachu.com'],
    rest: ['https://chihuahua-api.polkachu.com'],
    contractAddress: 'chihuahua1hplyuj2hzxd75q8686g9vm3uzrrny9ggvt8aza2csupgdp98vg2sp0e3h0',
    chainColor: '#FFC452',
    explorerUrl: 'https://ping.pub/chihuahua',
    background:'url(/public/assets/chihuahua_bg.png)',
  },
  osmosis: {
    // chainInfo: {...osmosis, rpc: 'https://chihuahua-rpc.polkachu.com', rest: 'https://rest.cosmos.directory/osmosis'},
    chainId: 'osmosis-1',
    rpc: ['https://osmosis-rpc.polkachu.com'],
    rest: ['https://osmosis-api.polkachu.com'],
    contractAddress: 'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07',
    explorerUrl: 'https://ping.pub/osmosis',
    chainColor: '#EB51F9',
    background:'url(/public/assets/lab_bg.gif)',
  }
}

export const chainIds = Object.values(ENDPOINTS).flatMap(({ chainId }) => chainId)
export const chains = Object.values(ENDPOINTS).map(({ chainInfo }) => chainInfo)