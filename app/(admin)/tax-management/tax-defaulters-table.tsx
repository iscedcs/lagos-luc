"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Mail, Phone, AlertTriangle, Filter } from "lucide-react"

// Mock data for defaulters
const defaulters = [
  {
    id: "DEF-001",
    propertyId: "LG-IKJ-12345",
    owner: "Adebayo Johnson",
    address: "15 Awolowo Road, Ikeja",
    zone: "Ikeja",
    amountDue: 450000,
    daysOverdue: 45,
    status: "First Notice",
  },
  {
    id: "DEF-002",
    propertyId: "LG-LKI-23456",
    owner: "Chioma Okafor",
    address: "7B Admiralty Way, Lekki Phase 1",
    zone: "Lekki",
    amountDue: 850000,
    daysOverdue: 75,
    status: "Second Notice",
  },
  {
    id: "DEF-003",
    propertyId: "LG-VIC-34567",
    owner: "Emmanuel Okonkwo",
    address: "25 Kofo Abayomi Street, Victoria Island",
    zone: "Victoria Island",
    amountDue: 1250000,
    daysOverdue: 120,
    status: "Final Notice",
  },
  {
    id: "DEF-004",
    propertyId: "LG-IKY-45678",
    owner: "Folake Adeleke",
    address: "10 Bourdillon Road, Ikoyi",
    zone: "Ikoyi",
    amountDue: 1850000,
    daysOverdue: 150,
    status: "Legal Action",
  },
  {
    id: "DEF-005",
    propertyId: "LG-SUR-56789",
    owner: "Gabriel Martins",
    address: "45 Adeniran Ogunsanya Street, Surulere",
    zone: "Surulere",
    amountDue: 320000,
    daysOverdue: 60,
    status: "Second Notice",
  },
  {
    id: "DEF-006",
    propertyId: "LG-YAB-67890",
    owner: "Halima Yusuf",
    address: "12 Herbert Macaulay Way, Yaba",
    zone: "Yaba",
    amountDue: 280000,
    daysOverdue: 30,
    status: "First Notice",
  },
  {
    id: "DEF-007",
    propertyId: "LG-APA-78901",
    owner: "Ibrahim Bello",
    address: "5 Creek Road, Apapa",
    zone: "Apapa",
    amountDue: 520000,
    daysOverdue: 90,
    status: "Final Notice",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "First Notice":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          First Notice
        </Badge>
      )
    case "Second Notice":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Second Notice
        </Badge>
      )
    case "Final Notice":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Final Notice
        </Badge>
      )
    case "Legal Action":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Legal Action
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function TaxDefaultersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [zoneFilter, setZoneFilter] = useState("all")

  const filteredDefaulters = defaulters.filter((defaulter) => {
    const matchesSearch =
      defaulter.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || defaulter.status === statusFilter
    const matchesZone = zoneFilter === "all" || defaulter.zone === zoneFilter

    return matchesSearch && matchesStatus && matchesZone
  })

  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tax Defaulters</CardTitle>
            <CardDescription>Property owners with outstanding tax payments</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Generate Notices
            </Button>
            <Button variant="default" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Reminders
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by owner, property ID or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="First Notice">First Notice</SelectItem>
                <SelectItem value="Second Notice">Second Notice</SelectItem>
                <SelectItem value="Final Notice">Final Notice</SelectItem>
                <SelectItem value="Legal Action">Legal Action</SelectItem>
              </SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                <SelectItem value="Ikeja">Ikeja</SelectItem>
                <SelectItem value="Lekki">Lekki</SelectItem>
                <SelectItem value="Victoria Island">Victoria Island</SelectItem>
                <SelectItem value="Ikoyi">Ikoyi</SelectItem>
                <SelectItem value="Surulere">Surulere</SelectItem>
                <SelectItem value="Yaba">Yaba</SelectItem>
                <SelectItem value="Apapa">Apapa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDefaulters.map((defaulter) => (
                <TableRow key={defaulter.id}>
                  <TableCell className="font-medium">{defaulter.propertyId}</TableCell>
                  <TableCell>{defaulter.owner}</TableCell>
                  <TableCell>{defaulter.address}</TableCell>
                  <TableCell>{defaulter.zone}</TableCell>
                  <TableCell className="font-semibold text-red-600">{formatCurrency(defaulter.amountDue)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        defaulter.daysOverdue > 90
                          ? "destructive"
                          : defaulter.daysOverdue > 60
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {defaulter.daysOverdue} days
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(defaulter.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredDefaulters.length} of {defaulters.length} defaulters
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

