import type { Metadata } from "next"
import { BarChart3, Filter, PieChart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "./date-range-picker"
import PropertyValueChart from "./property-value-chart"
import PropertyTypeDistribution from "./property-type-distribution"
import PropertyRegistrationTrend from "./property-registration-trend"
import PropertyComplianceRate from "./property-compliance-rate"
import ExportButton from "./export-button"

export const metadata: Metadata = {
  title: "Property Analytics | Lagos Property Map",
  description: "Analytics and insights for properties in the Lagos Property Map system",
}

export default function PropertyAnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Analytics</h2>
          <p className="text-muted-foreground">Insights and trends for properties in the Lagos Property Map system</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <ExportButton />
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Property Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦45,750,000</div>
            <p className="text-xs text-emerald-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              5.2% increase from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total LUC Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1.25B</div>
            <p className="text-xs text-emerald-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              12.8% increase from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Property Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7%</div>
            <p className="text-xs text-muted-foreground">Year-over-year growth in registered properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83.2%</div>
            <p className="text-xs text-emerald-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              3.5% increase from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <Tabs defaultValue="value" className="w-full">
        <TabsList>
          <TabsTrigger value="value">Property Values</TabsTrigger>
          <TabsTrigger value="distribution">Type Distribution</TabsTrigger>
          <TabsTrigger value="registration">Registration Trends</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="value" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Value Trends</CardTitle>
              <CardDescription>Average property values by zone over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PropertyValueChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Type Distribution</CardTitle>
              <CardDescription>Distribution of properties by type and use</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PropertyTypeDistribution />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Registration Trends</CardTitle>
              <CardDescription>Monthly property registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PropertyRegistrationTrend />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Rate by Zone</CardTitle>
              <CardDescription>Payment compliance rates across different zones</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PropertyComplianceRate />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

