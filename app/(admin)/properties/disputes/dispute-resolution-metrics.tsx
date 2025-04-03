"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Generate mock data for the chart
const generateChartData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the last 6 months
  const currentMonth = new Date().getMonth();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i) % 12;
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
  });

  return last6Months.map((month) => {
    const filed = Math.floor(Math.random() * 30) + 10;
    const resolved = Math.floor(Math.random() * filed * 0.9);
    const avgResolutionTime = Math.floor(Math.random() * 10) + 10; // 10-20 days

    return {
      name: month,
      filed,
      resolved,
      avgResolutionTime,
    };
  });
};

export default function DisputeResolutionMetrics() {
  const data = generateChartData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="filed"
          name="Disputes Filed"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="resolved"
          name="Disputes Resolved"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
