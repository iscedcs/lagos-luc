import type { Metadata } from "next"
import { Filter, Globe, MapPin, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ZonesMap from "./zones-map"
import ZonesTable from "./zones-table"
import ZoneRatesTable from "./zone-rates-table"
import AddZoneModal from "./add-zone-modal"

export const metadata: Metadata = {
  title: "Property Zones | Lagos Property Map",
  description: "Manage property zones and areas in the Lagos Property Map system",
}

export default function PropertyZonesPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Zones</h2>
          <p className="text-muted-foreground">Manage geographical zones and their valuation rates</p>
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
          <AddZoneModal />
        </div>
      </div>

      {/* Zone Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Zones</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across Lagos State</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Premium Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">High-value property areas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.45%</div>
            <p className="text-xs text-muted-foreground">Average LUC rate across zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Zone Updates</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Last: 15 days ago</div>
            <p className="text-xs text-muted-foreground">Last zone boundary update</p>
          </CardContent>
        </Card>
      </div>

      {/* Zone Map */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Map</CardTitle>
          <CardDescription>Geographical view of property zones in Lagos</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ZonesMap />
        </CardContent>
      </Card>

      {/* Zone Tables */}
      <Tabs defaultValue="zones" className="w-full">
        <TabsList>
          <TabsTrigger value="zones">Zones List</TabsTrigger>
          <TabsTrigger value="rates">Zone Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="mt-6">
          <ZonesTable />
        </TabsContent>

        <TabsContent value="rates" className="mt-6">
          <ZoneRatesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

