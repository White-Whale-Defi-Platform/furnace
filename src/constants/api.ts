export const FETCH_INTERVAL = 6_000

export const ENDPOINTS: Record<
string,
{ rpc: string[], rest: string[], furnaces: string[], chainColor: string }
> = {
  migaloo: {
    rpc: ['https://migaloo-rpc.polkachu.com'],
    rest: ['https://migaloo-api.polkachu.com'],
    furnaces: [
      'migaloo1g64rjr4ztp388f2mcnsvjcrmsnygyy6kks5286',
      'migaloo1utlt67jkfan980zw7uhs7a9cqrud0su7m4qmkd7cdzz5hyz6v26qlk5ry2'
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
