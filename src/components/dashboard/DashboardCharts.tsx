'use client'
import { ENDPOINTS } from '@/constants'
import {
  Unstable_Grid2 as Grid,
  Paper,
  styled,
  Typography
} from '@mui/material'
import { assets, chains } from 'chain-registry'
import React, { type FC } from 'react'
import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts'

// This is dummy data just to build ui for now
const assetInfo = {
  osmosis: [
    // {
    //   asset: assets
    //     .find(({ chain_name: chainName }) => chainName === "osmosis")
    //     ?.assets.find(({ symbol }) => symbol === "OSMO")!,
    //   totalBurned: 51_000_234_789,
    //   uniques: 30_123,
    //   tokenPrice: 0.03,
    //   fill: "#b100cd",
    // },
    {
      asset: assets
        .find(({ chain_name: chainName }) => chainName === 'osmosis')
        ?.assets.find(({ symbol }) => symbol === 'LAB')!,
      totalBurned: 11_234_789,
      uniques: 30_123,
      tokenPrice: 110,
      fill: 'green'
    }
  ]
}

// returns an array of tuples that have the chain name and details about the fuel assets on that chain
// so that we can use the data later for different visualizations
const assetTuples = Object.entries(assetInfo).map(
  ([chainName, assets]) =>
    [
      chainName,
      assets.map((asset) => {
        const totalValueBurned =
          asset.tokenPrice *
          (asset.totalBurned /
            Math.pow(
              10,
              Math.max(
                ...asset.asset.denom_units.map(({ exponent }) => exponent)
              )
            ))

        return {
          ...asset,
          // The dollar value of fuel asset burned
          totalValueBurned,
          // The average dollar of fuel asset burned for each user
          avgValueBurnedPerUnique: totalValueBurned / asset.uniques,
          chain: chainName,
          symbol: asset.asset.symbol
        }
      })
    ] as const
)

const flattenedAssetTuples = assetTuples.flatMap(
  ([_, assetInfos]) => assetInfos
)

// Make an object where the keys are the token symbol and the values are the dollar value of that token that have been burned
// e.g. { OSMO: 1_000_000, WHALE: 2_000_000 }
const burnedByChainData = Object.fromEntries(
  flattenedAssetTuples.map(({ symbol, totalValueBurned }) => [
    symbol,
    totalValueBurned
  ])
)

// Make an array that has an element for each chain and the sum of the unique burners for all of the chain fuel assets
// TODO: this needs more calculation on not repeating the unique address in multiple assets on one chain
// e.g. a address who burned Whale and Guppy in Migaloo should be 1 unique address not 2
const uniqueChainBurners = assetTuples.map(([chainName, assetInfos]) => ({
  chainName,
  unique: assetInfos
    .map(({ uniques }) => uniques)
    .reduce((initial, accum) => initial + accum, 0)
}))

const uniqueBurnersPerChain = Object.fromEntries(
  uniqueChainBurners.map(({ chainName, unique }) => [chainName, unique])
)

const chainBySymbol: Record<
string,
{
  chainName: string
  tokens: (typeof assetInfo)[keyof typeof assetInfo]
  tokenFill: string
}
> = Object.fromEntries(
  assetTuples.flatMap(([chainName, chainInfo]) =>
    chainInfo.map((asset) => [
      asset.asset.symbol,
      { chainName, tokens: chainInfo, tokenFill: asset.fill }
    ])
  )
)

const numberOfFuelAssets = Object.fromEntries(
  assetTuples.map(([chainName, assets]) => [chainName, assets.length])
)

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

export const DashboardCharts: FC = () => {
  return (
    <Grid container spacing={3}>
      {/* Avg Value Burned Per User */}
      <Grid md={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <ChartLabel>Average Value Burned Per User</ChartLabel>
          <ResponsiveContainer height={400}>
            <PieChart>
              <Legend verticalAlign="bottom" height={50} />
              <Tooltip
                formatter={(value) =>
                  `${new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(value))}/user`
                }
              />
              <Pie
                dataKey="avgValueBurnedPerUnique"
                nameKey="symbol"
                data={flattenedAssetTuples}
                labelLine={false}
                innerRadius={40}
                outerRadius={130}
              >
                {flattenedAssetTuples.map((entry, index) => (
                  <Cell key={`cell-${index}`} color={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Number of Fuel Assets Per Chain */}
      <Grid md={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <ChartLabel>Number of Fuel Assets Per Chain</ChartLabel>
          <ResponsiveContainer height={400}>
            <BarChart
              data={[numberOfFuelAssets]}
              margin={{
                top: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat().format(Number(value))
                }
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                labelStyle={{ color: 'ActiveBorder' }}
              />
              <Legend
                formatter={(v) =>
                  chains.find(({ chain_name }) => chain_name === v)
                    ?.pretty_name ?? v
                }
              />
              {Object.entries(numberOfFuelAssets).map(([chainName, assets]) => (
                <Bar
                  key={`${chainName}${assets}`}
                  dataKey={chainName}
                  fill={ENDPOINTS[chainName].chainColor}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Number of unique burnes per chains */}
      <Grid md={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <ChartLabel>Number of Unique Burners by Chains</ChartLabel>
          <ResponsiveContainer height={400}>
            <BarChart
              data={[uniqueBurnersPerChain]}
              margin={{
                top: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat().format(Number(value))
                }
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value) =>
                  `${new Intl.NumberFormat().format(Number(value))} burners`
                }
              />
              <Legend
                formatter={(v) =>
                  chains.find(({ chain_name }) => chain_name === v)
                    ?.pretty_name ?? v
                }
              />
              {Object.entries(uniqueBurnersPerChain).map(
                ([chainName, uniques]) => (
                  <Bar
                    key={`${chainName}${uniques}`}
                    dataKey={chainName}
                    fill={ENDPOINTS[chainName].chainColor}
                  />
                )
              )}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Add value burned by chain  */}
      <Grid md={12} lg={6}>
        <Paper sx={{ p: 2 }}>
          <ChartLabel>Value Burned Per Chain</ChartLabel>
          <ResponsiveContainer height={400}>
            <BarChart
              data={[burnedByChainData]}
              margin={{
                top: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat().format(Number(value))}`
                }
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value) =>
                  new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(value))
                }
              />
              <Legend />
              {Object.entries(burnedByChainData).map(([symbol, amount]) => (
                <Bar
                  key={`${symbol}${amount}`}
                  dataKey={symbol}
                  stackId={chainBySymbol[symbol].chainName}
                  fill={chainBySymbol[symbol].tokenFill}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  )
}
