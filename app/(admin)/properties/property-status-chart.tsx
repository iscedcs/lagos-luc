"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for property status
const mockData = [
  {
    zone: "Lagos Island",
    residential: 2450,
    commercial: 1850,
    industrial: 320,
    government: 180,
    verified: 4100,
    pending: 520,
    disputed: 180,
  },
  {
    zone: "Ikeja",
    residential: 1980,
    commercial: 1540,
    industrial: 580,
    government: 210,
    verified: 3600,
    pending: 480,
    disputed: 230,
  },
  {
    zone: "Lekki",
    residential: 2850,
    commercial: 980,
    industrial: 210,
    government: 120,
    verified: 3500,
    pending: 520,
    disputed: 140,
  },
  {
    zone: "Surulere",
    residential: 1650,
    commercial: 720,
    industrial: 180,
    government: 90,
    verified: 2200,
    pending: 320,
    disputed: 120,
  },
  {
    zone: "Ikorodu",
    residential: 1250,
    commercial: 380,
    industrial: 420,
    government: 60,
    verified: 1750,
    pending: 280,
    disputed: 80,
  },
  {
    zone: "Badagry",
    residential: 850,
    commercial: 210,
    industrial: 150,
    government: 40,
    verified: 1050,
    pending: 160,
    disputed: 40,
  },
]

export default function PropertyStatusChart() {
  const [isMounted, setIsMounted] = useState(false)
  const [chartType, setChartType] = useState<"type" | "status">("type")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType("type")}
            className={`px-3 py-1 text-sm rounded-md ${
              chartType === "type" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            By Property Type
          </button>
          <button
            onClick={() => setChartType("status")}
            className={`px-3 py-1 text-sm rounded-md ${
              chartType === "status" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            By Verification Status
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zone" />
          <YAxis />
          <Tooltip />
          <Legend />

          {chartType === "type" ? (
            <>
              <Bar dataKey="residential" name="Residential" fill="#10b981" />
              <Bar dataKey="commercial" name="Commercial" fill="#3b82f6" />
              <Bar dataKey="industrial" name="Industrial" fill="#8b5cf6" />
              <Bar dataKey="government" name="Government" fill="#f59e0b" />
            </>
          ) : (
            <>
              <Bar dataKey="verified" name="Verified" fill="#10b981" />
              <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
              <Bar dataKey="disputed" name="Disputed" fill="#ef4444" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

