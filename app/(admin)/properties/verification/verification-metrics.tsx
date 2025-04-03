"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate mock data for the chart
const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Get the last 6 months
  const currentMonth = new Date().getMonth()
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i) % 12
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex]
  })

  return last6Months.map((month) => {
    const submitted = Math.floor(Math.random() * 100) + 50
    const verified = Math.floor(Math.random() * submitted * 0.9)
    const rejected = Math.floor(Math.random() * submitted * 0.2)
    const pending = submitted - verified - rejected

    return {
      name: month,
      submitted,
      verified,
      rejected,
      pending,
      avgTime: Math.floor(Math.random() * 5) + 1, // 1-6 days
    }
  })
}

export default function VerificationMetrics() {
  const data = generateChartData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="submitted" name="Submitted" fill="#8884d8" />
        <Bar yAxisId="left" dataKey="verified" name="Verified" fill="#82ca9d" />
        <Bar yAxisId="left" dataKey="rejected" name="Rejected" fill="#ff8042" />
        <Bar yAxisId="left" dataKey="pending" name="Pending" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

