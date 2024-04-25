import { Typography, styled } from '@mui/material'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const ChartLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  pb: 5
})

export const AvgValueBurned = () => {
  return (
    <>
       <ChartLabel>Average Value Burned Per User Coming Soon</ChartLabel>
          {/* <ResponsiveContainer height={400}>
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
          </ResponsiveContainer> */}
    </>
  )
}
