"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for compliance rates by zone
const mockData = [
  { zone: "Ikoyi", compliance: 92 },
  { zone: "Victoria Island", compliance: 88 },
  { zone: "Lekki Phase 1", compliance: 85 },
  { zone: "Ajah", compliance: 76 },
  { zone: "Ikeja", compliance: 82 },
  { zone: "Yaba", compliance: 79 },
  { zone: "Surulere", compliance: 74 },
  { zone: "Gbagada", compliance: 71 },
]

export default function PropertyComplianceRate() {
  const chartData = useMemo(() => mockData, [])

  // Function to determine bar color based on compliance rate
  const getBarColor = (value: number) => {
    if (value >= 85) return "#10b981" // Green for high compliance
    if (value >= 75) return "#f59e0b" // Amber for medium compliance
    return "#ef4444" // Red for low compliance
  }

  return (
    <ChartContainer
      config={{
        compliance: {
          label: "Compliance Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zone" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`${value}%`, "Compliance Rate"]}
          />
          <Legend />
          <Bar dataKey="compliance" name="Compliance Rate" fill="var(--color-compliance)" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.compliance)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

