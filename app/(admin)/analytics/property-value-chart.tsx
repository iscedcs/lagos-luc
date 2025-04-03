"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for property values by zone
const mockData = [
  { zone: "Ikoyi", residential: 120000000, commercial: 180000000, industrial: 150000000 },
  { zone: "Victoria Island", residential: 100000000, commercial: 160000000, industrial: 130000000 },
  { zone: "Lekki Phase 1", residential: 85000000, commercial: 120000000, industrial: 100000000 },
  { zone: "Ajah", residential: 45000000, commercial: 70000000, industrial: 60000000 },
  { zone: "Ikeja", residential: 60000000, commercial: 90000000, industrial: 75000000 },
  { zone: "Yaba", residential: 50000000, commercial: 75000000, industrial: 65000000 },
  { zone: "Surulere", residential: 40000000, commercial: 60000000, industrial: 50000000 },
  { zone: "Gbagada", residential: 35000000, commercial: 55000000, industrial: 45000000 },
]

// Format large numbers to millions
const formatToMillions = (value: number) => {
  return `₦${(value / 1000000).toFixed(1)}M`
}

export default function PropertyValueChart() {
  const chartData = useMemo(() => mockData, [])

  return (
    <ChartContainer
      config={{
        residential: {
          label: "Residential",
          color: "hsl(var(--chart-1))",
        },
        commercial: {
          label: "Commercial",
          color: "hsl(var(--chart-2))",
        },
        industrial: {
          label: "Industrial",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zone" />
          <YAxis tickFormatter={formatToMillions} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="residential" fill="var(--color-residential)" name="Residential" />
          <Bar dataKey="commercial" fill="var(--color-commercial)" name="Commercial" />
          <Bar dataKey="industrial" fill="var(--color-industrial)" name="Industrial" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

