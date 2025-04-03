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
import { ArrowUpDown, CheckCircle, Eye, MoreHorizontal, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
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
type VerificationHistoryItem = {
  id: string
  propertyId: string
  address: string
  type: string
  use: string
  ownerName: string
  verificationDate: string
  verifiedBy: string
  result: "verified" | "rejected"
  reason: string | null
  processingTime: number // in hours
}

// Generate mock data
const generateMockData = (count: number): VerificationHistoryItem[] => {
  const propertyTypes = ["Land", "Building", "Mixed-use"]
  const propertyUses = ["Residential", "Commercial", "Industrial", "Government"]
  const zones = ["Lagos Island", "Ikeja", "Lekki", "Surulere", "Ikorodu", "Badagry"]
  const lgas = ["Lagos Island", "Ikeja", "Eti-Osa", "Surulere", "Ikorodu", "Badagry"]
  const results = ["verified", "rejected"] as const
  const verifiers = ["John Okafor", "Sarah Johnson", "David Adeyemi"]
  const rejectionReasons = [
    "Incomplete documentation",
    "Inconsistent information",
    "Duplicate property",
    "Ownership dispute",
    "Invalid location data",
    null,
  ]

  return Array.from({ length: count }, (_, i) => {
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const use = propertyUses[Math.floor(Math.random() * propertyUses.length)]
    const zone = zones[Math.floor(Math.random() * zones.length)]
    const lga = lgas[Math.floor(Math.random() * lgas.length)]
    const result = results[Math.floor(Math.random() * results.length)]
    const verifiedBy = verifiers[Math.floor(Math.random() * verifiers.length)]
    const processingTime = Math.floor(Math.random() * 48) + 1 // 1-48 hours
    const reason =
      result === "rejected" ? rejectionReasons[Math.floor(Math.random() * (rejectionReasons.length - 1))] : null

    return {
      id: `id-${i + 1}`,
      propertyId: `LGS-${100000 + i}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${zone} Road, ${lga}`,
      type,
      use,
      ownerName: ["John Doe", "Jane Smith", "David Adeyemi", "Sarah Johnson", "Michael Chen"][
        Math.floor(Math.random() * 5)
      ],
      verificationDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
        .toISOString()
        .split("T")[0],
      verifiedBy,
      result,
      reason,
      processingTime,
    }
  })
}

export default function VerificationHistory() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  // Define the columns
  const columns: ColumnDef<VerificationHistoryItem>[] = [
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
      accessorKey: "verificationDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Verified On
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("verificationDate")}</div>,
    },
    {
      accessorKey: "verifiedBy",
      header: "Verified By",
      cell: ({ row }) => <div>{row.getValue("verifiedBy")}</div>,
    },
    {
      accessorKey: "result",
      header: "Result",
      cell: ({ row }) => {
        const result = row.getValue("result") as string

        return (
          <Badge
            className={
              result === "verified"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            {result === "verified" ? (
              <CheckCircle className="mr-1 h-3 w-3 inline" />
            ) : (
              <XCircle className="mr-1 h-3 w-3 inline" />
            )}
            {result.charAt(0).toUpperCase() + result.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "processingTime",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Processing Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const hours = row.getValue("processingTime") as number
        return <div>{hours} hours</div>
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
              {property.result === "rejected" && (
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  Reopen Verification
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Generate mock data
  const data = generateMockData(100)

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
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

