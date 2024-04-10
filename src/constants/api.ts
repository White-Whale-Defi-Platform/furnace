export const FETCH_INTERVAL = 6_000

export const ENDPOINTS: Record<
string,
{ rpc: string[], rest: string[], furnaces: string[], chainColor: string }
> = {
  migaloo: {
    rpc: ['https://migaloo-rpc.polkachu.com'],
    rest: ['https://migaloo-api.polkachu.com'],
    furnaces: [
      'migaloo1erul6xyq0gk6ws98ncj7lnq9l4jn4gnnu9we73gdz78yyl2lr7qqrvcgup',
      'migaloo1r9x8fz4alekzr78k42rpmr9unpa7egsldpqeynmwl2nfvzexue9sn8l5rg'
    ],
    chainColor: '#31c259'
  },
  chihuahua: {
    rpc: ['https://chihuahua-rpc.polkachu.com'],
    rest: ['https://chihuahua-api.polkachu.com'],
    furnaces: [
      'chihuahua19vxp8vq8qm368dr026qxh8v82satwaf79y235lfv6wmgpwxx8dtsqwvtqa'
    ],
    chainColor: '#F0A841'
  }
}
