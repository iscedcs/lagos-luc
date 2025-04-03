"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { AlertTriangle, ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Define the dispute data type
type Dispute = {
  id: string
  propertyId: string
  address: string
  disputeType: "ownership" | "boundary" | "valuation" | "classification" | "documentation"
  status: "open" | "under_review" | "escalated" | "resolved" | "rejected"
  priority: "high" | "medium" | "low"
  filedBy: string
  filedAgainst: string
  filedDate: string
  lastUpdated: string
  daysOpen: number
  assignedTo: string | null
}

// Generate mock data
const generateMockData = (count: number, filter: string): Dispute[] => {
  const propertyIds = Array.from({ length: count }, (_, i) => `LGS-${100000 + i}`)
  const addresses = [
    "15 Admiralty Way, Lekki Phase 1",
    "25 Marina Street, Lagos Island",
    "10 Allen Avenue, Ikeja",
    "5 Awolowo Road, Ikoyi",
    "30 Bode Thomas Street, Surulere",
  ]
  const disputeTypes = ["ownership", "boundary", "valuation", "classification", "documentation"] as const
  const statuses = ["open", "under_review", "escalated", "resolved", "rejected"] as const
  const priorities = ["high", "medium", "low"] as const
  const names = ["John Doe", "Jane Smith", "David Adeyemi", "Sarah Johnson", "Michael Chen"]
  const assignees = ["John Okafor", "Sarah Johnson", "David Adeyemi", null]

  let filteredStatuses: (typeof statuses)[number][] = []

  if (filter === "open") {
    filteredStatuses = ["open", "under_review"]
  } else if (filter === "resolved") {
    filteredStatuses = ["resolved", "rejected"]
  } else if (filter === "escalated") {
    filteredStatuses = ["escalated"]
  } else {
    filteredStatuses = [...statuses]
  }

  return Array.from({ length: count }, (_, i) => {
    const disputeType = disputeTypes[Math.floor(Math.random() * disputeTypes.length)]
    const status = filteredStatuses[Math.floor(Math.random() * filteredStatuses.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const filedBy = names[Math.floor(Math.random() * names.length)]
    const filedAgainst = names[Math.floor(Math.random() * names.length)]
    const daysOpen = Math.floor(Math.random() * 60) + 1 // 1-60 days
    const assignedTo = assignees[Math.floor(Math.random() * assignees.length)]

    // Generate dates
    const filedDate = new Date(Date.now() - daysOpen * 24 * 60 * 60 * 1000)
    const lastUpdated = new Date(filedDate.getTime() + Math.floor(Math.random() * daysOpen) * 24 * 60 * 60 * 1000)

    return {
      id: `dispute-${i + 1}`,
      propertyId: propertyIds[Math.floor(Math.random() * propertyIds.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)],
      disputeType,
      status,
      priority,
      filedBy,
      filedAgainst,
      filedDate: filedDate.toISOString().split("T")[0],
      lastUpdated: lastUpdated.toISOString().split("T")[0],
      daysOpen,
      assignedTo,
    }
  })
}

export default function DisputesTable({ filter = "open" }: { filter: string }) {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Define the columns
  const columns: ColumnDef<Dispute>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "propertyId",
      header: "Property ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("propertyId")}</div>,
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Address
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("address")}</div>,
    },
    {
      accessorKey: "disputeType",
      header: "Dispute Type",
      cell: ({ row }) => {
        const disputeType = row.getValue("disputeType") as string
        return <div className="capitalize">{disputeType.replace("_", " ")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge
            className={
              status === "resolved"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : status === "open"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : status === "under_review"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                    : status === "escalated"
                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
          >
            {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string

        return (
          <Badge
            className={
              priority === "high"
                ? "bg-red-100 text-red-800 hover:bg-red-200"
                : priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "filedBy",
      header: "Filed By",
      cell: ({ row }) => <div>{row.getValue("filedBy")}</div>,
    },
    {
      accessorKey: "filedAgainst",
      header: "Filed Against",
      cell: ({ row }) => <div>{row.getValue("filedAgainst")}</div>,
    },
    {
      accessorKey: "filedDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Filed Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("filedDate")}</div>,
    },
    {
      accessorKey: "daysOpen",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Days Open
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const days = row.getValue("daysOpen") as number
        return (
          <div className="flex items-center">
            <AlertTriangle
              className={`mr-2 h-4 w-4 ${
                days > 30 ? "text-red-500" : days > 14 ? "text-amber-500" : "text-emerald-500"
              }`}
            />
            <span>{days} days</span>
          </div>
        )
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      cell: ({ row }) => {
        const assignedTo = row.getValue("assignedTo") as string | null
        return <div>{assignedTo || "Unassigned"}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const dispute = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dispute.id)}>
                Copy Dispute ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/superadmin/properties/disputes/${dispute.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Assign to Me</DropdownMenuItem>
              <DropdownMenuItem>Update Status</DropdownMenuItem>
              {dispute.status !== "escalated" && (
                <DropdownMenuItem className="text-red-600">Escalate Dispute</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Generate mock data
  const data = generateMockData(50, filter)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter disputes..."
          value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("address")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

