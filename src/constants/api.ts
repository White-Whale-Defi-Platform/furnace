export const FETCH_INTERVAL = 6_000

export type ChainName = string

export const ENDPOINTS = {
  // migaloo: {
  //   rpc: ['https://migaloo-rpc.polkachu.com'],
  //   rest: ['https://migaloo-api.polkachu.com'],
  //   contractAddress: 'migaloo1r9x8fz4alekzr78k42rpmr9unpa7egsldpqeynmwl2nfvzexue9sn8l5rg',
  //   furnaces: [
  //     // whale
  //     'migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup',
  //     // guppy
  //     'migaloo1r9x8fz4alekzr78k42rpmr9unpa7egsldpqeynmwl2nfvzexue9sn8l5rg'
  //   ],
  //   chainColor: '#31c259'
  // },
  chihuahua: {
    rpc: ['https://chihuahua-rpc.polkachu.com'],
    rest: ['https://chihuahua-api.polkachu.com'],
    contractAddress: 'chihuahua1hplyuj2hzxd75q8686g9vm3uzrrny9ggvt8aza2csupgdp98vg2sp0e3h0',
    furnaces: [
      'chihuahua1hplyuj2hzxd75q8686g9vm3uzrrny9ggvt8aza2csupgdp98vg2sp0e3h0'
    ],
    chainColor: '#F0A841'
  },
  osmosis: {
    rpc: ['https://osmosis-rpc.polkachu.com'],
    rest: ['https://osmosis-api.polkachu.com'],
    contractAddress: 'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07',
    furnaces: [
      'osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07'
    ],
    chainColor: '#b100cd'
  }
}
