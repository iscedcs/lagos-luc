"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Filter, MoreHorizontal, Search } from "lucide-react"

// Mock data for audit logs
const generateMockAuditLogs = (userActivityOnly = false) => {
  const eventTypes = userActivityOnly
    ? ["Login", "Logout", "Property Registration", "Property Update", "Payment", "Document Upload", "Profile Update"]
    : [
        "System Start",
        "System Shutdown",
        "Backup",
        "Database Migration",
        "API Error",
        "Security Alert",
        "Configuration Change",
      ]

  const users = ["admin@lagos.gov", "john.doe@lagos.gov", "sarah.smith@lagos.gov", "tech.support@lagos.gov", "system"]

  const severities = ["Low", "Medium", "High", "Critical"]

  return Array.from({ length: 50 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))

    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const user = userActivityOnly
      ? users[Math.floor(Math.random() * (users.length - 1))]
      : Math.random() > 0.7
        ? "system"
        : users[Math.floor(Math.random() * (users.length - 1))]

    let description = ""
    if (userActivityOnly) {
      if (eventType === "Login") description = `User ${user} logged in successfully`
      else if (eventType === "Logout") description = `User ${user} logged out`
      else if (eventType === "Property Registration")
        description = `User ${user} registered property ID: LG-${1000 + i}`
      else if (eventType === "Property Update")
        description = `User ${user} updated property ID: LG-${1000 + Math.floor(Math.random() * 500)}`
      else if (eventType === "Payment") description = `User ${user} processed payment ID: PMT-${10000 + i}`
      else if (eventType === "Document Upload")
        description = `User ${user} uploaded document: ${["Deed", "Certificate", "Tax Form", "ID"][Math.floor(Math.random() * 4)]}`
      else description = `User ${user} updated profile information`
    } else {
      if (eventType === "System Start") description = "System services started successfully"
      else if (eventType === "System Shutdown") description = "System shutdown initiated for maintenance"
      else if (eventType === "Backup") description = "Database backup completed successfully"
      else if (eventType === "Database Migration") description = "Database schema migration v2.3.1 applied"
      else if (eventType === "API Error") description = "External payment API returned error code 503"
      else if (eventType === "Security Alert")
        description = `Failed login attempt for user ${users[Math.floor(Math.random() * (users.length - 1))]}`
      else description = "System configuration updated by administrator"
    }

    return {
      id: `LOG-${100000 + i}`,
      timestamp: date,
      eventType,
      user,
      description,
      severity: userActivityOnly ? "Low" : severities[Math.floor(Math.random() * severities.length)],
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    }
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

interface AuditLogTableProps {
  dateRange?: DateRange | undefined
  userActivityOnly?: boolean
}

export function AuditLogTable({ dateRange, userActivityOnly = false }: AuditLogTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null)

  const itemsPerPage = 10
  const mockLogs = generateMockAuditLogs(userActivityOnly)

  // Filter logs based on search, date range, and filters
  const filteredLogs = mockLogs.filter((log) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Date range filter
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (log.timestamp >= dateRange.from && log.timestamp <= dateRange.to)

    // Severity filter
    const matchesSeverity = !selectedSeverity || log.severity === selectedSeverity

    // Event type filter
    const matchesEventType = !selectedEventType || log.eventType === selectedEventType

    return matchesSearch && matchesDateRange && matchesSeverity && matchesEventType
  })

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get unique event types for filter
  const eventTypes = Array.from(new Set(mockLogs.map((log) => log.eventType)))

  // Get unique severities for filter
  const severities = Array.from(new Set(mockLogs.map((log) => log.severity)))

  // Function to get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 hover:bg-red-600"
      case "High":
        return "bg-orange-500 hover:bg-orange-600"
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Low":
      default:
        return "bg-green-500 hover:bg-green-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setSelectedSeverity(null)}
                  className={!selectedSeverity ? "bg-accent" : ""}
                >
                  All Severities
                </DropdownMenuItem>
                {severities.map((severity) => (
                  <DropdownMenuItem
                    key={severity}
                    onClick={() => setSelectedSeverity(severity)}
                    className={selectedSeverity === severity ? "bg-accent" : ""}
                  >
                    {severity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Event Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setSelectedEventType(null)}
                  className={!selectedEventType ? "bg-accent" : ""}
                >
                  All Event Types
                </DropdownMenuItem>
                {eventTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setSelectedEventType(type)}
                    className={selectedEventType === type ? "bg-accent" : ""}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Log ID</TableHead>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.id}</TableCell>
                  <TableCell className="text-xs">
                    {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">{log.description}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(log.severity)}>{log.severity}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-mono text-xs">{log.ipAddress}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export Entry</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

