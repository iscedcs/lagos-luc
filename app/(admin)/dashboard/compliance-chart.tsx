"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Mock data for compliance by zone
const mockData = [
  { name: "Lagos Island", value: 85, color: "#10b981" },
  { name: "Ikeja", value: 72, color: "#3b82f6" },
  { name: "Lekki", value: 78, color: "#8b5cf6" },
  { name: "Surulere", value: 65, color: "#f59e0b" },
  { name: "Ikorodu", value: 48, color: "#ef4444" },
  { name: "Badagry", value: 42, color: "#ec4899" },
  { name: "Other Zones", value: 55, color: "#94a3b8" },
]

export default function ComplianceChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Compliance Rate"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

