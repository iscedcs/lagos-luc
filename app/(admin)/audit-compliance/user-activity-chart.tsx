"use client"

import type { DateRange } from "react-day-picker"
import { ChartContainer } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Generate mock data for user activity
const generateActivityData = () => {
  const activityTypes = ["Login", "Property Registration", "Property Update", "Payment", "Document Upload"]

  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 29 + i)

    const result: any = {
      date: date.toISOString().split("T")[0],
    }

    activityTypes.forEach((type) => {
      result[type] = Math.floor(Math.random() * 20) + (type === "Login" ? 30 : 5)
    })

    return result
  })
}

interface UserActivityChartProps {
  dateRange?: DateRange | undefined
}

export function UserActivityChart({ dateRange }: UserActivityChartProps) {
  const activityData = generateActivityData()

  // Filter data based on date range
  const filteredData =
    dateRange?.from && dateRange?.to
      ? activityData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= dateRange.from! && itemDate <= dateRange.to!
        })
      : activityData

  return (
    <ChartContainer
      config={{
        Login: {
          label: "Login",
          color: "hsl(var(--chart-1))",
        },
        "Property Registration": {
          label: "Property Registration",
          color: "hsl(var(--chart-2))",
        },
        "Property Update": {
          label: "Property Update",
          color: "hsl(var(--chart-3))",
        },
        Payment: {
          label: "Payment",
          color: "hsl(var(--chart-4))",
        },
        "Document Upload": {
          label: "Document Upload",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={filteredData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Login" stackId="1" stroke="var(--color-Login)" fill="var(--color-Login)" />
          <Area
            type="monotone"
            dataKey="Property Registration"
            stackId="1"
            stroke="var(--color-Property Registration)"
            fill="var(--color-Property Registration)"
          />
          <Area
            type="monotone"
            dataKey="Property Update"
            stackId="1"
            stroke="var(--color-Property Update)"
            fill="var(--color-Property Update)"
          />
          <Area
            type="monotone"
            dataKey="Payment"
            stackId="1"
            stroke="var(--color-Payment)"
            fill="var(--color-Payment)"
          />
          <Area
            type="monotone"
            dataKey="Document Upload"
            stackId="1"
            stroke="var(--color-Document Upload)"
            fill="var(--color-Document Upload)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

