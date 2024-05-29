import type { FurnaceQueryClient } from '@/codegen'
export interface LeaderboardResults {
  uniqueBurners: number
  totalBurnedAssets: number
  avgTokensBurnedPerUniques: number
  leaderboard: Array<[userAddress: string, tokensBurned: number]>
}

export type LeaderboardInfo = [
  fuelDenom: string,
  leaderboardResults: LeaderboardResults
]

export type LeaderboardsByChain = Record<string, LeaderboardInfo[]>

/**
 * Fetches all of the leaderboard and pre-calculates some of the fuel infos in a specific fuel_denom.
 * @param client The client for interacting with a furnace contract.
 * @param fuelDenom Denom that you want to get the leaderboard for- you can query fuel_denom from the fuels config.
 * @param limit The max number of leaderboard to fetch in each set of paginated data.
 * @param startAfter The address to base the next set of paginated data off.
 * @returns List of all of the burners, how much each burned and some other data around the burning.
 */
export const fetchLeaderboard = async (
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
      ]).sort(([__, a], [_, b]) => b - a)
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
