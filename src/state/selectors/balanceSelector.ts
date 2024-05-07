import { selectorFamily } from 'recoil'
import { clientsAtom } from '../atoms'
import type { ChainName } from '@/constants'
import type { Coin } from '@cosmjs/stargate'

/**
 * Returns the users denom balance
 */
export const balanceSelector = selectorFamily<Coin | undefined, { chainName: ChainName, address: string | undefined, denom: string }>({
  key: 'balanceSelector',
  get: ({ chainName, denom, address }) => async ({ get }) => {
    const { client } = get(clientsAtom)[chainName]
    // console.log(client.getBalance('chihuahua12emutgfv7hy46khk5x36e9fczuvk9ktpzsmdv7', "factory/chihuahua1hplyuj2hzxd75q8686g9vm3uzrrny9ggvt8aza2csupgdp98vg2sp0e3h0/lab.huahua"))
    // console.log(client.getBalance('osmo12emutgfv7hy46khk5x36e9fczuvk9ktpf79nmw', "factory/osmo1svj5kd8kzj7xxtrd6ftjk0856ffpyj4egz7f9pd9dge5wr4kwansmefq07/lab.ash"))
    return (address != null) ? await client.getBalance(address, denom) : undefined
  }
})
