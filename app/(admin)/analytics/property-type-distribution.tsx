"use client"

import { useMemo } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for property type distribution
const mockData = [
  { name: "Residential", value: 65, color: "hsl(var(--chart-1))" },
  { name: "Commercial", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Industrial", value: 7, color: "hsl(var(--chart-3))" },
  { name: "Mixed Use", value: 3, color: "hsl(var(--chart-4))" },
]

export default function PropertyTypeDistribution() {
  const chartData = useMemo(() => mockData, [])

  return (
    <ChartContainer
      config={{
        Residential: {
          label: "Residential",
          color: "hsl(var(--chart-1))",
        },
        Commercial: {
          label: "Commercial",
          color: "hsl(var(--chart-2))",
        },
        Industrial: {
          label: "Industrial",
          color: "hsl(var(--chart-3))",
        },
        "Mixed Use": {
          label: "Mixed Use",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

