"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for property registrations
const mockData = [
  { month: "Jan", residential: 120, commercial: 45, industrial: 18, government: 5 },
  { month: "Feb", residential: 132, commercial: 62, industrial: 24, government: 8 },
  { month: "Mar", residential: 145, commercial: 78, industrial: 29, government: 12 },
  { month: "Apr", residential: 165, commercial: 82, industrial: 35, government: 15 },
  { month: "May", residential: 182, commercial: 91, industrial: 42, government: 18 },
  { month: "Jun", residential: 204, commercial: 110, industrial: 48, government: 22 },
  { month: "Jul", residential: 186, commercial: 142, industrial: 53, government: 25 },
  { month: "Aug", residential: 172, commercial: 135, industrial: 41, government: 19 },
  { month: "Sep", residential: 188, commercial: 152, industrial: 38, government: 21 },
  { month: "Oct", residential: 210, commercial: 168, industrial: 45, government: 24 },
  { month: "Nov", residential: 232, commercial: 174, industrial: 52, government: 28 },
  { month: "Dec", residential: 245, commercial: 192, industrial: 58, government: 32 },
]

export default function PropertyRegistrationChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="residential" name="Residential" fill="#10b981" />
        <Bar dataKey="commercial" name="Commercial" fill="#3b82f6" />
        <Bar dataKey="industrial" name="Industrial" fill="#8b5cf6" />
        <Bar dataKey="government" name="Government" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

