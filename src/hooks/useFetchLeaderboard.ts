import type { FurnaceQueryClient } from '@/codegen'
import { useSigningCosmWasmClient } from './useSigningCosmWasmClient'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

// this is to query the fuel infos like total burned asset, unique burners, and avgTokensBurnedPerUniques
const fetchLeaderboard = async (
  client: FurnaceQueryClient,
  fuelDenom: string,
  limit: number,
  startAfter?: string
): Promise<LeaderboardResults> =>
  await client.leaderboard({ fuelDenom, limit, startAfter })
  // paginate the leaderboard data with recursion
    .then(async ({ leaderboard }) => leaderboard.length < limit
      ? leaderboard
      : [
          ...leaderboard,
          ...(await fetchLeaderboard(client, fuelDenom, limit, leaderboard.at(-1)?.[0])).leaderboard
        ])
    .then(leaderboard => leaderboard.map(([address, burnAmount]): [string, number] => [address, Number(burnAmount)]))
    .then((leaderboard) => {
      const uniqueBurners = leaderboard.length
      const totalBurnedAssets = leaderboard
        .reduce((totalBurned, [_, burned]) => totalBurned + burned, 0)
      const avgTokensBurnedPerUniques = totalBurnedAssets / uniqueBurners
      return { leaderboard, uniqueBurners, totalBurnedAssets, avgTokensBurnedPerUniques }
    })

export const useFetchLeaderboard = (chainName: string, fuelDenom: string): UseQueryResult<LeaderboardResults> => {
  const { result: client } = useSigningCosmWasmClient(chainName)

  return useQuery({
    queryKey: ['leaderboard', chainName, fuelDenom],
    queryFn: async () => (client != null)
      ? await fetchLeaderboard(client, fuelDenom, 100)
      : undefined,
    enabled: client != null
  })
}
