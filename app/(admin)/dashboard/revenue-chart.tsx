"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for revenue collection
const mockData = [
  { month: "Jan", actual: 18.2, projected: 20.0 },
  { month: "Feb", actual: 21.5, projected: 22.0 },
  { month: "Mar", actual: 25.8, projected: 24.0 },
  { month: "Apr", actual: 22.3, projected: 26.0 },
  { month: "May", actual: 28.4, projected: 28.0 },
  { month: "Jun", actual: 30.2, projected: 30.0 },
  { month: "Jul", actual: 32.5, projected: 32.0 },
  { month: "Aug", actual: 34.1, projected: 34.0 },
  { month: "Sep", actual: 31.8, projected: 36.0 },
  { month: "Oct", actual: 35.2, projected: 38.0 },
  { month: "Nov", actual: 38.5, projected: 40.0 },
  { month: "Dec", actual: 42.3, projected: 42.0 },
]

export default function RevenueChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`₦${value}M`, "Revenue"]} />
        <Area type="monotone" dataKey="projected" name="Projected" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
        <Area type="monotone" dataKey="actual" name="Actual" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

