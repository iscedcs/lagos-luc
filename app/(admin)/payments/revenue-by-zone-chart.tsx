"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Ikeja", value: 35000000, color: "#10b981" },
  { name: "Lekki", value: 45000000, color: "#3b82f6" },
  { name: "Victoria Island", value: 55000000, color: "#6366f1" },
  { name: "Ikoyi", value: 40000000, color: "#8b5cf6" },
  { name: "Yaba", value: 25000000, color: "#ec4899" },
  { name: "Other Zones", value: 30000000, color: "#f59e0b" },
]

const formatValue = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: "compact",
    compactDisplay: "short",
  }).format(value)
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm">{formatValue(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export function RevenueByZoneChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

