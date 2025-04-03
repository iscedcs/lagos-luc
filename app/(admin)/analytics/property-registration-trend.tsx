"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for property registration trends
const mockData = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 145 },
  { month: "Mar", registrations: 160 },
  { month: "Apr", registrations: 190 },
  { month: "May", registrations: 210 },
  { month: "Jun", registrations: 220 },
  { month: "Jul", registrations: 240 },
  { month: "Aug", registrations: 280 },
  { month: "Sep", registrations: 250 },
  { month: "Oct", registrations: 290 },
  { month: "Nov", registrations: 310 },
  { month: "Dec", registrations: 340 },
]

export default function PropertyRegistrationTrend() {
  const chartData = useMemo(() => mockData, [])

  return (
    <ChartContainer
      config={{
        registrations: {
          label: "Registrations",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="registrations"
            stroke="var(--color-registrations)"
            fill="var(--color-registrations)"
            fillOpacity={0.3}
            name="Registrations"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

