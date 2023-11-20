'use client'

import { ReactNode } from 'react'
import { isBefore, isToday } from 'date-fns'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { newMockData } from '@/data/mockDataGenerator'
import { formatToBRL } from '@/utils/formatToBRL'
import { getBarChartData } from '@/utils/getBarChartData'

type StackedBarPlot = {
  children: ReactNode
}

export const StackedBarPlot = () => {
  const chartData = getBarChartData(newMockData)

  return (
    <div style={{ padding: '3rem' }}>
      <h2 style={{ paddingLeft: '35px' }}>
        Balance or expected daily balance for the chosen period
      </h2>
      <h3 style={{ paddingLeft: '35px' }}>Measured in Brazilian Reais (R$)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          stackOffset="sign"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            tick={CustomTick}
            dataKey="isoDate"
            tickLine={{ stroke: '#666' }}
            axisLine={true}
          />
          <YAxis
            tick={{ fontSize: '0.75rem' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            labelFormatter={(label) => {
              return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(`${label}T00:00`))
            }}
            formatter={(value, _, { payload }) => {
              const isNegative = (value as number) < 0
              const isPastTransactions = isBefore(
                new Date(`${payload.isoDate}T00:00`),
                new Date(),
              )
              const formattedValue = formatToBRL(value as number)

              if (isNegative && isPastTransactions) {
                return [formattedValue, `Total withdrawal amount`]
              }

              if (isNegative && !isPastTransactions) {
                return [formattedValue, `Projected withdrawal amount`]
              }

              if (!isNegative && isPastTransactions) {
                return [formattedValue, `Total deposit amount`]
              }

              if (!isNegative && !isPastTransactions) {
                return [formattedValue, `Projected deposit amount`]
              }
            }}
          />
          <ReferenceLine y={0} stroke="#3f3f46" strokeDasharray="3 3" />
          <Bar dataKey="totalWithdrawn" fill="#8884d8" stackId="stack" />
          <Bar dataKey="totalDeposited" fill="#82ca9d" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTick = ({
  x,
  y,
  payload: { value },
}: {
  x: number
  y: number
  payload: { value: string }
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        dx={32}
        textAnchor="end"
        fill="#666"
        style={{
          fontWeight: isToday(new Date(`${value}T00:00`)) ? 'bold' : 'normal',
          fontSize: '0.75rem',
        }}
      >
        {value}
      </text>
    </g>
  )
}
