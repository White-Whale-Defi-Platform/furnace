import type { FurnaceQueryClient } from '@/codegen/Furnace.client'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'

export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

// this is to grab the fuel infos like total burned asset and unique burners
const fetchLeaderboard = async (
  client: FurnaceQueryClient,
  fuelDenom: string,
  limit: number,
  startAfter?: string
): Promise<Array<[userAddress: string, tokensBurned: number]>> =>
  await client.leaderboard({ fuelDenom, limit, startAfter })
    .then(async ({ leaderboard }) => leaderboard.length < limit
      ? leaderboard
      : [
          ...leaderboard,
          ...(await fetchLeaderboard(client, fuelDenom, limit, leaderboard.at(-1)?.[0]))
        ])
    .then(leaderboard => leaderboard.map(([address, burnAmount]): [string, number] => [address, Number(burnAmount)]))

export const useFetchLeaderboard = (chainName: string, fuelDenom: string): UseQueryResult<LeaderboardResults> => {
  const { result: client } = useSigningCosmWasmClient(chainName)

  return useQuery({
    queryKey: ['leaderboard', chainName, fuelDenom],
    queryFn: async () => (client != null)
      ? await fetchLeaderboard(client, fuelDenom, 30)
        .then((leaderboard) => {
          const uniqueBurners = leaderboard.length
          const totalBurnedAssets = leaderboard
            .reduce((totalBurned, [_, burned]) => totalBurned + burned, 0)
          const avgTokensBurnedPerUnique = totalBurnedAssets / uniqueBurners

          return ({ leaderboard, uniqueBurners, totalBurnedAssets, avgTokensBurnedPerUnique })
        })
      : undefined,
    enabled: client != null
  })
}
