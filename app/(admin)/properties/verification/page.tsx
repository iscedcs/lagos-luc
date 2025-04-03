import type { Metadata } from "next"
import { CheckCircle, Clock, Filter, RefreshCw, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import VerificationQueue from "./verification-queue"
import VerificationHistory from "./verification-history"
import VerificationMetrics from "./verification-metrics"

export const metadata: Metadata = {
  title: "Property Verification | Lagos Property Map",
  description: "Manage property verification workflows in the Lagos Property Map system",
}

export default function PropertyVerificationPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Verification</h2>
          <p className="text-muted-foreground">Manage and track property verification workflows</p>
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

      {/* Verification Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Properties awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Verified Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">+8</Badge>
              <span className="ml-2 text-xs text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">-3</Badge>
              <span className="ml-2 text-xs text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 days</div>
            <p className="text-xs text-emerald-500">0.3 days faster than last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Metrics</CardTitle>
          <CardDescription>Verification performance over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <VerificationMetrics />
        </CardContent>
      </Card>

      {/* Verification Queue and History */}
      <Tabs defaultValue="queue" className="w-full">
        <TabsList>
          <TabsTrigger value="queue">Verification Queue</TabsTrigger>
          <TabsTrigger value="history">Verification History</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="mt-6">
          <VerificationQueue />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <VerificationHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

