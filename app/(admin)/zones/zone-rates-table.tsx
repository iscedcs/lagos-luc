"use client"

import { useCallback, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getAllZones, searchZones, Zone } from "@/actions/zone"
import { useToast } from "@/components/ui/use-toast"

interface ZoneRate {
  zoneName: string;
  zoneType: string;
  propertyType: 'Residential' | 'Commercial' | 'Industrial';
  rate: number;
}

export default function ZoneRatesTable() {
  const [zones, setZones] = useState<Zone[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchZones = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAllZones()
      if (response.success) {
        setZones(response.data.zones)
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch zones",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchTerm(query)
      if (query.trim()) {
        setLoading(true)
        try {
          const response = await searchZones(query)
          if (response.success) {
            setZones(response.data)
          }
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setLoading(false)
        }
      } else {
        fetchZones()
      }
    },
    [fetchZones]
  )

  useEffect(() => {
    fetchZones()
  }, [fetchZones])

  // Transform zones data into rate rows
  const zoneRates: ZoneRate[] = zones.flatMap((zone) => [
    {
      zoneName: zone.zoneName,
      zoneType: zone.zoneType,
      propertyType: 'Residential',
      rate: zone.residentialRate,
    },
    {
      zoneName: zone.zoneName,
      zoneType: zone.zoneType,
      propertyType: 'Commercial',
      rate: zone.commercialRate,
    },
    {
      zoneName: zone.zoneName,
      zoneType: zone.zoneType,
      propertyType: 'Industrial',
      rate: zone.industrialRate,
    },
  ])

  const filteredRates = searchTerm
    ? zoneRates.filter(
        (rate) =>
          rate.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rate.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : zoneRates

  return (
    <Card>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search rates by zone or property type..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Zone Type</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead className="text-right">Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRates.map((rate, index) => (
                <TableRow key={`${rate.zoneName}-${rate.propertyType}-${index}`}>
                  <TableCell className="font-medium">{rate.zoneName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{rate.zoneType}</Badge>
                  </TableCell>
                  <TableCell>{rate.propertyType}</TableCell>
                  <TableCell className="text-right">
                    {(rate.rate * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
              {filteredRates.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No rates found
                  </TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading rates...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}

