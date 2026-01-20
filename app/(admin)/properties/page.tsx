import type { Metadata } from "next"
import { Building, Download, Filter, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import PropertiesDataTable from "./properties-data-table"
import PropertyStatusChart from "./property-status-chart"
import PropertyFilters from "./property-filters"
import EmptyPropertiesState from "./empty-properties-state"
import Link from "next/link"
import { getAllProperties } from "@/actions/properties"

export const metadata: Metadata = {
  title: "Property Management | Lagos Property Map",
  description: "Manage all properties in the Lagos Property Map system",
}

export default async function PropertiesPage() {
  const propertiesData = await getAllProperties(100, 1)
  const properties = propertiesData.data || []
  const totalProperties = propertiesData.meta?.total || 0
  const verifiedCount = properties.filter(p => p.status === 'VERIFIED').length
  const pendingCount = properties.filter(p => p.status === 'PENDING').length
  const rejectedCount = properties.filter(p => p.status === 'REJECTED').length

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
          <p className="text-muted-foreground">
            Manage and monitor all properties in the Lagos Property Map system
          </p>
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
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="h-9 bg-emerald-600 hover:bg-emerald-700"
            asChild
          >
            <Link href="/register-property" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Property Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all zones and categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Properties
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedCount.toLocaleString()}</div>
            <div className="flex items-center">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                {totalProperties > 0 ? ((verifiedCount / totalProperties) * 100).toFixed(1) : 0}%
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                of total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Verification
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount.toLocaleString()}</div>
            <div className="flex items-center">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                {totalProperties > 0 ? ((pendingCount / totalProperties) * 100).toFixed(1) : 0}%
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                of total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Disputed Properties
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount.toLocaleString()}</div>
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                {totalProperties > 0 ? ((rejectedCount / totalProperties) * 100).toFixed(1) : 0}%
              </Badge>
              <span className="ml-2 text-xs text-muted-foreground">
                of total
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Property Distribution</CardTitle>
          <CardDescription>
            Distribution of properties by type and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <PropertyStatusChart />
          </div>
        </CardContent>
      </Card>

      {/* Properties Table or Empty State */}
      {properties.length === 0 ? (
        <EmptyPropertiesState />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
              <TabsTrigger value="government">Government</TabsTrigger>
            </TabsList>

            <PropertyFilters />
          </div>

          <TabsContent value="all" className="mt-6">
            <PropertiesDataTable data={properties} filter="all" />
          </TabsContent>

          <TabsContent value="residential" className="mt-6">
            <PropertiesDataTable data={properties.filter(p => p.propertyUse === 'RESIDENTIAL')} filter="residential" />
          </TabsContent>

          <TabsContent value="commercial" className="mt-6">
            <PropertiesDataTable data={properties.filter(p => p.propertyUse === 'COMMERCIAL')} filter="commercial" />
          </TabsContent>

          <TabsContent value="industrial" className="mt-6">
            <PropertiesDataTable data={properties.filter(p => p.propertyUse === 'INDUSTRIAL')} filter="industrial" />
          </TabsContent>

          <TabsContent value="government" className="mt-6">
            <PropertiesDataTable data={properties} filter="government" />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

