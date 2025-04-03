"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 18000000,
    transactions: 420,
  },
  {
    name: "Feb",
    revenue: 16500000,
    transactions: 380,
  },
  {
    name: "Mar",
    revenue: 19200000,
    transactions: 450,
  },
  {
    name: "Apr",
    revenue: 17800000,
    transactions: 410,
  },
  {
    name: "May",
    revenue: 20500000,
    transactions: 470,
  },
  {
    name: "Jun",
    revenue: 21200000,
    transactions: 490,
  },
  {
    name: "Jul",
    revenue: 22500000,
    transactions: 520,
  },
  {
    name: "Aug",
    revenue: 24000000,
    transactions: 550,
  },
  {
    name: "Sep",
    revenue: 25500000,
    transactions: 580,
  },
  {
    name: "Oct",
    revenue: 27000000,
    transactions: 620,
  },
  {
    name: "Nov",
    revenue: 28500000,
    transactions: 650,
  },
  {
    name: "Dec",
    revenue: 30000000,
    transactions: 680,
  },
]

const formatRevenue = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: "compact",
    compactDisplay: "short",
  }).format(value)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-emerald-600">Revenue: {formatRevenue(payload[0].value)}</p>
        <p className="text-sm text-blue-600">Transactions: {payload[1].value}</p>
      </div>
    )
  }
  return null
}

export function PaymentTrendsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
          <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#10b981" />
          <Bar yAxisId="right" dataKey="transactions" name="Transactions" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

