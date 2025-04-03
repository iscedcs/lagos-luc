import type { Metadata } from "next"
import { AlertTriangle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DisputesTable from "./disputes-table"
import DisputesByTypeChart from "./disputes-by-type-chart"
import DisputeResolutionMetrics from "./dispute-resolution-metrics"

export const metadata: Metadata = {
  title: "Property Disputes | Lagos Property Map",
  description: "Manage property disputes in the Lagos Property Map system",
}

export default function PropertyDisputesPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Disputes</h2>
          <p className="text-muted-foreground">Manage and resolve property disputes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Dispute Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Unresolved property disputes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">26.4%</Badge>
              <span className="ml-2 text-xs text-muted-foreground">of total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
            <AlertTriangle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">+8</Badge>
              <span className="ml-2 text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2 days</div>
            <p className="text-xs text-emerald-500">2.3 days faster than last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Dispute Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Disputes by Type</CardTitle>
            <CardDescription>Distribution of disputes by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DisputesByTypeChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Metrics</CardTitle>
            <CardDescription>Dispute resolution performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DisputeResolutionMetrics />
          </CardContent>
        </Card>
      </div>

      {/* Disputes Table with Tabs */}
      <Tabs defaultValue="open" className="w-full">
        <TabsList>
          <TabsTrigger value="open">Open Disputes</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Disputes</TabsTrigger>
          <TabsTrigger value="escalated">Escalated Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          <DisputesTable filter="open" />
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <DisputesTable filter="resolved" />
        </TabsContent>

        <TabsContent value="escalated" className="mt-6">
          <DisputesTable filter="escalated" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

