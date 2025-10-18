"use client"

import { useCallback, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { getAllZones, deleteZone, searchZones, Zone } from "@/actions/zone"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"

export default function ZonesTable() {
  const [zones, setZones] = useState<Zone[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
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

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteZone(id)
      if (response.success) {
        toast({
          title: "Success",
          description: "Zone deleted successfully",
        })
        fetchZones()
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete zone",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search zones..."
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
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tax Rate</TableHead>
              <TableHead>Property Rates</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.zoneName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{zone.zoneType}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={zone.status === "ACTIVE" ? "default" : "secondary"}>
                    {zone.status}
                  </Badge>
                </TableCell>
                <TableCell>{(zone.taxRate * 100).toFixed(2)}%</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-xs">Residential: {(zone.residentialRate * 100).toFixed(2)}%</div>
                    <div className="text-xs">Commercial: {(zone.commercialRate * 100).toFixed(2)}%</div>
                    <div className="text-xs">Industrial: {(zone.industrialRate * 100).toFixed(2)}%</div>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(zone.lastUpdated), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit Zone
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(zone.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete Zone
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {zones.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No zones found
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading zones...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

