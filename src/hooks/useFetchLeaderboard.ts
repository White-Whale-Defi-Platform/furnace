import type { FurnaceQueryClient } from '@/codegen'
import {
  useAllChainCosmWasmClients,
  useFetchAllChainAssets,
  useSigningCosmWasmClient
} from './index'
import {
  type UseQueryResult,
  useQuery,
  useQueries
} from '@tanstack/react-query'
export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

type LeaderboardInfo = [
  fuelDenom: string,
  leaderboardResults: LeaderboardResults
]

type LeaderboardsByChain = Record<string, LeaderboardInfo[]>

/**
 * Fetches all of the leaderboard and pre-calculates some of the fuel infos in a specific fuel_denom.
 * @param client The client for interacting with a furnace contract.
 * @param fuelDenom Denom that you want to get the leaderboard for- you can query fuel_denom from the fuels config.
 * @param limit The max number of leaderboard to fetch in each set of paginated data.
 * @param startAfter The address to base the next set of paginated data off.
 * @returns List of all of the burners, how much each burned and some other data around the burning.
 */
const fetchLeaderboard = async (
  client: FurnaceQueryClient,
  fuelDenom: string,
  limit: number,
  startAfter?: string
): Promise<LeaderboardResults> =>
  await client
    .leaderboard({ fuelDenom, limit, startAfter })
    // paginate the leaderboard data with recursion
    .then(async ({ leaderboard }) =>
      leaderboard.length < limit
        ? leaderboard
        : [
            ...leaderboard,
            ...(
              await fetchLeaderboard(
                client,
                fuelDenom,
                limit,
                leaderboard.at(-1)?.[0]
              )
            ).leaderboard
          ]
    )
    .then((leaderboard) =>
      leaderboard.map(([address, burnAmount]): [string, number] => [
        address,
        Number(burnAmount)
      ])
    )
    .then((leaderboard) => {
      const uniqueBurners = leaderboard.length
      const totalBurnedAssets = leaderboard.reduce(
        (totalBurned, [_, burned]) => totalBurned + burned,
        0
      )
      const avgTokensBurnedPerUniques = totalBurnedAssets / uniqueBurners
      return {
        leaderboard,
        uniqueBurners,
        totalBurnedAssets,
        avgTokensBurnedPerUniques
      }
    })

/**
 * Gets the all of the leaderboard info for a single chain/furnace.
 * @param chainName That we're querying.
 * @param fuelDenom Denom that you want to get the leaderboard for - you can query fuel_denom from the fuels config.
 * @returns List of all of the burners for the given fuel denom and how much the user has burned in that denom.
 */
export const useFetchLeaderboard = (
  chainName: string,
  fuelDenom: string
): UseQueryResult<LeaderboardResults> => {
  // requesting the client to interact with blockchain in future
  const { result: client } = useSigningCosmWasmClient(chainName)
  return useQuery({
    queryKey: ['leaderboard', chainName, fuelDenom],
    queryFn: async () =>
      client != null
        ? await fetchLeaderboard(client, fuelDenom, 100)
        : undefined,
    enabled: client != null
  })
}

/**
 * Gets the leaderboards for every chain.
 * @returns All of the burners and its precalculated burners info in an object, keyed by the chain name.
 */
export const useFetchAllLeaderboard = (): {
  data: LeaderboardsByChain
  isLoading: boolean
  isError: boolean
} => {
  const { data: clients } = useAllChainCosmWasmClients()
  const allChainAssets = useFetchAllChainAssets()

  const leaderboardData = useQueries({
    queries: allChainAssets
      .flatMap(({ data }) => (data != null ? [data] : []))
      .flatMap(([chainName, assets]) =>
        assets.map(({ id: fuelDenom }) => ({
          queryKey: ['leaderboard', chainName, fuelDenom],
          queryFn: async () => {
            const client = clients[chainName]
            return typeof client !== 'undefined'
              ? await fetchLeaderboard(client, fuelDenom, 100).then(
                (
                  leaderboard
                ): [
                    chainName: string,
                    leaderboardInfo: LeaderboardInfo
                ] => [chainName, [fuelDenom, leaderboard]]
              )
              : undefined
          },
          enabled: clients[chainName] != null
        }))
      )
  })

  return {
    // Reduce the array of leaderboards down into an object that is keyed by the chain name
    // to make the data more accessible else where
    data: leaderboardData.reduce<LeaderboardsByChain>((allLeaderboards, thisLeaderboard) => {
      if (thisLeaderboard.data != null) {
        const {
          data: [chainName, leaderboard]
        } = thisLeaderboard
        return {
          ...allLeaderboards,
          [chainName]:
            chainName in allLeaderboards
              ? [...allLeaderboards[chainName], leaderboard]
              : [leaderboard]
        }
      } else {
        return allLeaderboards
      }
    }, {}),
    isLoading: leaderboardData.some(({ isLoading }) => isLoading),
    isError: leaderboardData.some(({ isError }) => isError)
  }
}
