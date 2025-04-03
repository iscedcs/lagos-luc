"use client"

import { useState } from "react"
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

// Mock data for zones
const MOCK_ZONES = [
  {
    id: 1,
    name: "Ikoyi",
    properties: 1245,
    status: "active",
    lastUpdated: "2023-12-15",
    taxRate: 0.75,
    averageValue: "₦450M",
  },
  {
    id: 2,
    name: "Victoria Island",
    properties: 1876,
    status: "active",
    lastUpdated: "2023-12-10",
    taxRate: 0.8,
    averageValue: "₦520M",
  },
  {
    id: 3,
    name: "Lekki Phase 1",
    properties: 2134,
    status: "active",
    lastUpdated: "2023-12-05",
    taxRate: 0.65,
    averageValue: "₦380M",
  },
  {
    id: 4,
    name: "Ikeja",
    properties: 3245,
    status: "active",
    lastUpdated: "2023-11-28",
    taxRate: 0.5,
    averageValue: "₦220M",
  },
  {
    id: 5,
    name: "Surulere",
    properties: 4532,
    status: "active",
    lastUpdated: "2023-11-20",
    taxRate: 0.45,
    averageValue: "₦180M",
  },
  {
    id: 6,
    name: "Yaba",
    properties: 2876,
    status: "active",
    lastUpdated: "2023-11-15",
    taxRate: 0.5,
    averageValue: "₦210M",
  },
  {
    id: 7,
    name: "Ajah",
    properties: 1543,
    status: "active",
    lastUpdated: "2023-11-10",
    taxRate: 0.4,
    averageValue: "₦150M",
  },
  {
    id: 8,
    name: "Apapa",
    properties: 987,
    status: "under-review",
    lastUpdated: "2023-11-05",
    taxRate: 0.6,
    averageValue: "₦280M",
  },
]

export default function ZonesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredZones = MOCK_ZONES.filter((zone) => zone.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search zones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add New Zone</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone ID</TableHead>
              <TableHead>Zone Name</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tax Rate</TableHead>
              <TableHead>Avg. Property Value</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredZones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell className="font-medium">{zone.id}</TableCell>
                <TableCell>{zone.name}</TableCell>
                <TableCell>{zone.properties.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={zone.status === "active" ? "default" : "secondary"}>
                    {zone.status === "active" ? "Active" : "Under Review"}
                  </Badge>
                </TableCell>
                <TableCell>{zone.taxRate}%</TableCell>
                <TableCell>{zone.averageValue}</TableCell>
                <TableCell>{zone.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Zone
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Zone
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

