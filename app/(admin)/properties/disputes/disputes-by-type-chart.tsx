"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Generate mock data for the chart
const generateChartData = () => {
  return [
    { name: "Ownership", value: 35, color: "#8884d8" },
    { name: "Boundary", value: 25, color: "#82ca9d" },
    { name: "Valuation", value: 18, color: "#ffc658" },
    { name: "Classification", value: 12, color: "#ff8042" },
    { name: "Documentation", value: 10, color: "#0088fe" },
  ]
}

export default function DisputesByTypeChart() {
  const data = generateChartData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} disputes`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

