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
import { ArrowUpDown, CheckCircle, Clock, Eye, MoreHorizontal, XCircle } from "lucide-react"

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

// Define the property data type
type VerificationProperty = {
  id: string
  propertyId: string
  address: string
  lga: string
  zone: string
  type: string
  use: string
  ownerName: string
  submissionDate: string
  priority: "high" | "medium" | "low"
  waitTime: number // in days
  documents: number
  assignedTo: string | null
}

// Generate mock data
const generateMockData = (count: number): VerificationProperty[] => {
  const propertyTypes = ["Land", "Building", "Mixed-use"]
  const propertyUses = ["Residential", "Commercial", "Industrial", "Government"]
  const zones = ["Lagos Island", "Ikeja", "Lekki", "Surulere", "Ikorodu", "Badagry"]
  const lgas = ["Lagos Island", "Ikeja", "Eti-Osa", "Surulere", "Ikorodu", "Badagry"]
  const priorities = ["high", "medium", "low"] as const
  const verifiers = ["John Okafor", "Sarah Johnson", "David Adeyemi", null]

  return Array.from({ length: count }, (_, i) => {
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const use = propertyUses[Math.floor(Math.random() * propertyUses.length)]
    const zone = zones[Math.floor(Math.random() * zones.length)]
    const lga = lgas[Math.floor(Math.random() * lgas.length)]
    const priority = priorities[Math.floor(Math.random() * priorities.length)]
    const waitTime = Math.floor(Math.random() * 14) + 1 // 1-14 days
    const documents = Math.floor(Math.random() * 5) + 1 // 1-5 documents
    const assignedTo = verifiers[Math.floor(Math.random() * verifiers.length)]

    return {
      id: `id-${i + 1}`,
      propertyId: `LGS-${100000 + i}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${zone} Road, ${lga}`,
      lga,
      zone,
      type,
      use,
      ownerName: ["John Doe", "Jane Smith", "David Adeyemi", "Sarah Johnson", "Michael Chen"][
        Math.floor(Math.random() * 5)
      ],
      submissionDate: new Date(Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000))
        .toISOString()
        .split("T")[0],
      priority,
      waitTime,
      documents,
      assignedTo,
    }
  })
}

export default function VerificationQueue() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Define the columns
  const columns: ColumnDef<VerificationProperty>[] = [
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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "use",
      header: "Use",
      cell: ({ row }) => <div>{row.getValue("use")}</div>,
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
      cell: ({ row }) => <div>{row.getValue("ownerName")}</div>,
    },
    {
      accessorKey: "submissionDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Submitted
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("submissionDate")}</div>,
    },
    {
      accessorKey: "waitTime",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Wait Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const waitTime = row.getValue("waitTime") as number
        return (
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{waitTime} days</span>
          </div>
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
      accessorKey: "documents",
      header: "Docs",
      cell: ({ row }) => <div className="text-center">{row.getValue("documents")}</div>,
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
        const property = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(property.id)}>
                Copy Property ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/superadmin/properties/${property.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                Verify Property
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                Reject Property
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                Assign to Me
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Generate mock data
  const data = generateMockData(50)

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
          placeholder="Filter properties..."
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

