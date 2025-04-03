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
import { Edit, MoreHorizontal, Trash } from "lucide-react"

// Mock data for zone rates
const MOCK_ZONE_RATES = [
  {
    id: 1,
    zoneName: "Ikoyi",
    propertyType: "Residential",
    ratePercentage: 0.75,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 2,
    zoneName: "Ikoyi",
    propertyType: "Commercial",
    ratePercentage: 1.2,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 3,
    zoneName: "Victoria Island",
    propertyType: "Residential",
    ratePercentage: 0.8,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 4,
    zoneName: "Victoria Island",
    propertyType: "Commercial",
    ratePercentage: 1.3,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 5,
    zoneName: "Lekki Phase 1",
    propertyType: "Residential",
    ratePercentage: 0.65,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 6,
    zoneName: "Lekki Phase 1",
    propertyType: "Commercial",
    ratePercentage: 1.1,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 7,
    zoneName: "Ikeja",
    propertyType: "Residential",
    ratePercentage: 0.5,
    effectiveDate: "2023-01-01",
    status: "active",
  },
  {
    id: 8,
    zoneName: "Ikeja",
    propertyType: "Commercial",
    ratePercentage: 0.9,
    effectiveDate: "2023-01-01",
    status: "pending",
  },
]

export default function ZoneRatesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRates = MOCK_ZONE_RATES.filter(
    (rate) =>
      rate.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.propertyType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search rates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add New Rate</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead>Rate (%)</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell className="font-medium">{rate.id}</TableCell>
                <TableCell>{rate.zoneName}</TableCell>
                <TableCell>{rate.propertyType}</TableCell>
                <TableCell>{rate.ratePercentage}%</TableCell>
                <TableCell>{rate.effectiveDate}</TableCell>
                <TableCell>
                  <Badge variant={rate.status === "active" ? "default" : "secondary"}>
                    {rate.status === "active" ? "Active" : "Pending"}
                  </Badge>
                </TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Rate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Rate
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

