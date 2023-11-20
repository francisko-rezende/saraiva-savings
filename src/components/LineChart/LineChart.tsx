'use client'

import { ReactNode } from 'react'
import { newMockData } from '@/data/mockDataGenerator'
import { isBefore, isToday } from 'date-fns'
import {
  LineChart as LineChartComponent,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { formatToBRL } from '@/utils/formatToBRL'
import { getLineChartData } from '@/utils/getLineChartData'

type LineChart = {
  children: ReactNode
}

export const LineChart = () => {
  const lineChartData = getLineChartData(newMockData)

  return (
    <div style={{ padding: '3rem' }}>
      <h2 style={{ paddingLeft: '35px' }}>
        Balance or expected daily balance for the chosen period
      </h2>
      <h3 style={{ paddingLeft: '35px' }}>Measured in Brazilian Reais (R$)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChartComponent
          width={500}
          height={300}
          data={lineChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <ReferenceLine y={0} stroke="#3f3f46" strokeDasharray="3 3" />
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
              const label = isBefore(
                new Date(`${payload.isoDate}T00:00`),
                new Date(),
              )
                ? 'Balance'
                : 'Expected Balance'
              const formattedValue = formatToBRL(value as number)
              return [formattedValue, label]
            }}
          />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#00A335"
            activeDot={{ r: 8 }}
            dot={{ fill: '#00A335' }}
            strokeWidth={3}
          />
        </LineChartComponent>
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
