import type { Metadata } from "next"
import {
  BarChart3,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  MapPin,
  PieChart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import DashboardMap from "./dashboard-map"
import PropertyRegistrationChart from "./property-registration-chart"
import RevenueChart from "./revenue-chart"
import ComplianceChart from "./compliance-chart"
import RecentActivityList from "./recent-activity-list"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "General overview of properties and users",
};

export default function SuperadminDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="current">Current Fiscal Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,432</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                12.5%
              </Badge>
              <span className="ml-2">from last month</span>
            </div>
            <Progress value={78} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦245.8M</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                8.2%
              </Badge>
              <span className="ml-2">from last month</span>
            </div>
            <Progress value={65} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65.4%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-red-600 bg-red-50">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                2.1%
              </Badge>
              <span className="ml-2">from last month</span>
            </div>
            <Progress value={65.4} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-emerald-600 bg-emerald-50">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                5.3%
              </Badge>
              <span className="ml-2">from last month</span>
            </div>
            <Progress value={42} className="mt-3 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Charts and Map */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Property Registration Trends</CardTitle>
            <CardDescription>Monthly property registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyRegistrationChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Property Distribution</CardTitle>
            <CardDescription>Geographic distribution of registered properties</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DashboardMap />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Revenue and Compliance */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Revenue Analysis
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Compliance Metrics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Collection</CardTitle>
              <CardDescription>Monthly revenue collection from Land Use Charge</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance by Zone</CardTitle>
              <CardDescription>Payment compliance rates across different zones</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">API Services</span>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">Database</span>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium">Payment Gateway</span>
                </div>
                <Badge variant="outline" className="text-yellow-600">
                  Degraded
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">SMS Notifications</span>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium">Email Service</span>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  Operational
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              View Incident Reports
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Users className="h-5 w-5 mb-2" />
              <span>Manage Users</span>
            </Button>

            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <Building className="h-5 w-5 mb-2" />
              <span>Property Verification</span>
            </Button>

            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <FileText className="h-5 w-5 mb-2" />
              <span>Generate Reports</span>
            </Button>

            <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4">
              <MapPin className="h-5 w-5 mb-2" />
              <span>Zone Management</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

