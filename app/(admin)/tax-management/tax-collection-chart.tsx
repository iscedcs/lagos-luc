"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const monthlyData = [
  { month: "Jan", collected: 1250000, target: 1500000 },
  { month: "Feb", collected: 1320000, target: 1500000 },
  { month: "Mar", collected: 1450000, target: 1500000 },
  { month: "Apr", collected: 1380000, target: 1500000 },
  { month: "May", collected: 1520000, target: 1500000 },
  { month: "Jun", collected: 1620000, target: 1500000 },
  { month: "Jul", collected: 1480000, target: 1600000 },
  { month: "Aug", collected: 1550000, target: 1600000 },
  { month: "Sep", collected: 1700000, target: 1600000 },
  { month: "Oct", collected: 1630000, target: 1600000 },
  { month: "Nov", collected: 1580000, target: 1600000 },
  { month: "Dec", collected: 1750000, target: 1600000 },
]

const quarterlyData = [
  { quarter: "Q1", collected: 4020000, target: 4500000 },
  { quarter: "Q2", collected: 4520000, target: 4500000 },
  { quarter: "Q3", collected: 4730000, target: 4800000 },
  { quarter: "Q4", collected: 4960000, target: 4800000 },
]

const zoneData = [
  { zone: "Ikeja", collected: 3250000, target: 3000000 },
  { zone: "Lekki", collected: 4120000, target: 4000000 },
  { zone: "Victoria Island", collected: 5320000, target: 5000000 },
  { zone: "Ikoyi", collected: 4850000, target: 4500000 },
  { zone: "Surulere", collected: 2150000, target: 2500000 },
  { zone: "Yaba", collected: 1980000, target: 2000000 },
  { zone: "Apapa", collected: 2450000, target: 2300000 },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-emerald-600">Collected: {formatCurrency(payload[0].value)}</p>
        <p className="text-blue-600">Target: {formatCurrency(payload[1].value)}</p>
        <p className="text-gray-600 text-sm mt-1">
          {payload[0].value >= payload[1].value
            ? "Target achieved ✓"
            : `${Math.round((payload[0].value / payload[1].value) * 100)}% of target`}
        </p>
      </div>
    )
  }
  return null
}

export default function TaxCollectionChart() {
  const [view, setView] = useState("monthly")

  const getChartData = () => {
    switch (view) {
      case "monthly":
        return monthlyData
      case "quarterly":
        return quarterlyData
      case "zonal":
        return zoneData
      default:
        return monthlyData
    }
  }

  const getXAxisKey = () => {
    switch (view) {
      case "monthly":
        return "month"
      case "quarterly":
        return "quarter"
      case "zonal":
        return "zone"
      default:
        return "month"
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tax Collection Performance</CardTitle>
        <CardDescription>Comparison of tax collection against targets</CardDescription>
        <Tabs defaultValue="monthly" value={view} onValueChange={setView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="zonal">By Zone</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={getXAxisKey()} />
              <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} domain={[0, "dataMax + 500000"]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="collected" name="Amount Collected" fill="#10b981" />
              <Bar dataKey="target" name="Collection Target" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="text-sm text-gray-500">Total Collected (YTD)</p>
            <p className="text-2xl font-bold text-emerald-600">₦18.23B</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-gray-500">Annual Target</p>
            <p className="text-2xl font-bold text-blue-600">₦20.00B</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3">
            <p className="text-sm text-gray-500">Collection Rate</p>
            <p className="text-2xl font-bold text-amber-600">91.2%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

