"use client"

import type { Metadata } from "next"
import { Filter, Globe, MapPin, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ZonesMap from "./zones-map"
import ZonesTable from "./zones-table"
import ZoneRatesTable from "./zone-rates-table"
import AddZoneModal from "./add-zone-modal"
import { getZoneStats } from "@/actions/zone"
import { useCallback, useEffect, useState } from "react"
import { ZoneStats } from "@/actions/zone"
import { useToast } from "@/components/ui/use-toast"

export default function PropertyZonesPage() {
  const [stats, setStats] = useState<ZoneStats | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getZoneStats();
      if (response.success) {
        setStats(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch zone statistics",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <AddZoneModal onZoneAdded={fetchStats} />
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
            <div className="text-2xl font-bold">{stats?.totalZones || 0}</div>
            <p className="text-xs text-muted-foreground">Across Lagos State</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Premium Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.zoneTypeBreakdown?.PREMIUM || 0}</div>
            <p className="text-xs text-muted-foreground">High-value property areas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(stats?.avgPropertyValue || 100000)}
            </div>
            <p className="text-xs text-muted-foreground">Average property value across zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Development Zones</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.zoneTypeBreakdown?.DEVELOPING || 0}</div>
            <p className="text-xs text-muted-foreground">Growing property areas</p>
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

