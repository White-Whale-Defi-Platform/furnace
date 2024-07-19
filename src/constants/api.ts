export type ChainName = string

export const ENDPOINTS: Record<
  string,
  { chainId: string, rpc: string[], rest: string[], chainColor: string, explorerUrl: string, contractAddress: string }
> = {
  chihuahua: {
    chainId: 'chihuahua-1',
    rpc: ['https://chihuahua-rpc.polkachu.com'],
    rest: ['https://chihuahua-api.polkachu.com'],
    contractAddress: 'chihuahua1hplyuj2hzxd75q8686g9vm3uzrrny9ggvt8aza2csupgdp98vg2sp0e3h0',
    chainColor: '#FFC452',
    explorerUrl: 'https://ping.pub/chihuahua',
  },
  osmosis: {
    chainId: 'osmosis-1',
    rpc: ['https://osmosis-rpc.polkachu.com'],
    rest: ['https://osmosis-api.polkachu.com'],
    contractAddress: 'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07',
    explorerUrl: 'https://ping.pub/osmosis',
    chainColor: '#EB51F9',
  },
  terra2: {
    chainId: 'phoenix-1',
    rpc: ['https://terra-rpc.polkachu.com'],
    rest: ['https://terra-api.polkachu.com'],
    contractAddress: 'terra1f5cfm48gcezl3cx25l64ngc4yktnmx7rcpj3kggu6v273742sqqs5yn5ks',
    explorerUrl: 'https://ping.pub/terra',
    chainColor: '#EB51F9',
  },
  migaloo: {
    chainId: 'migaloo-1',
    rpc: ['https://migaloo-rpc.polkachu.com'],
    rest: ['https://migaloo-api.polkachu.com'],
    contractAddress: 'migaloo14w9qu85aqwur9cm65ym68zfnprck9atk2h2vy64j5eyan3zh6vgsmn90lm',
    explorerUrl: 'https://ping.pub/migaloo',
    chainColor: '#EB51F9',
  },
  injective: {
    chainId: 'injective-1',
    rpc: ['https://injective-rpc.polkachu.com'],
    rest: ['https://injective-api.polkachu.com'],
    contractAddress: 'inj1ej2f3lmpxj4djsmmuxvnfuvplrut7zmwrq7zj8',
    explorerUrl: 'https://ping.pub/injective',
    chainColor: '#EB51F9',
  },
  juno: {
    chainId: 'juno-1',
    rpc: ['https://juno-rpc.polkachu.com'],
    rest: ['https://juno-api.polkachu.com'],
    contractAddress: 'juno16uprl38e4ljj5ctuha9ehpvp2l93z3d5jmwj2cttt6jkhlrhscpqgglalk',
    explorerUrl: 'https://ping.pub/juno',
    chainColor: '#EB51F9',
  },
}

export const chainIds = Object.values(ENDPOINTS).flatMap(({ chainId }) => chainId)
