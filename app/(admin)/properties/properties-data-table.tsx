"use client";

import { useState } from "react";
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
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Generate mock data for PropertyInterface
const generateMockData = (count: number): PropertyInterface[] => {
  const propertyTypes = ["LAND", "BUILDING"] as const;
  const propertyUses = ["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "MIXED"] as const;
  const conditions = ["NEW", "GOOD", "FAIR", "POOR"] as const;
  const statuses = ["PENDING", "APPROVED", "REJECTED", "VERIFIED"] as const;
  const priorities = ["LOW", "MEDIUM", "HIGH"] as const;
  const ownershipTypes = ["INDIVIDUAL", "COMPANY"] as const;

  return Array.from({ length: count }, (_, i) => {
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const propertyUse = propertyUses[Math.floor(Math.random() * propertyUses.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const value = Math.floor(Math.random() * 100000000) + 1000000;

    return {
      id: `id-${i + 1}`,
      code: `P${100000 + i}`,
      address: `${Math.floor(Math.random() * 200) + 1} Lekki Road, Lagos`,
      lga: "Eti-Osa",
      lcda: "Ikoyi-Obalende",
      ward: `Ward ${String.fromCharCode(65 + (i % 5))}`,
      ownerId: `owner-${i + 1}`,
      ownershipType: ownershipTypes[Math.floor(Math.random() * ownershipTypes.length)],
      companyId: null,
      zoneId: `zone-${i % 3}`,
      assignedAgentId: null,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      propertyType,
      propertyUse,
      locationClass: "HighValueZone",
      buildingType: propertyType === "BUILDING" ? "Detached Duplex" : undefined,
      numberOfUnits: propertyType === "BUILDING" ? Math.floor(Math.random() * 10) + 1 : undefined,
      buildingHeight: propertyType === "BUILDING" ? Math.floor(Math.random() * 5) + 1 : undefined,
      coveredArea: Math.floor(Math.random() * 1000) + 100,
      yearBuilt: propertyType === "BUILDING" ? 2015 : undefined,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      wallType: "Cement Block",
      roofType: "Aluminium Roof",
      finishingQuality: "BASIC",
      locationWeight: 0.75,
      useWeight: 0.6,
      typeWeight: 0.9,
      buildingFactor: 1.15,
      areaFactor: 1.3,
      estimatedValue: value,
      annualLUC: Math.floor(value * 0.005),
      waitTime: Math.floor(Math.random() * 100),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status,
      rejectionReason: status === "REJECTED" ? "Invalid property details" : undefined,
      verifiedAt: status === "VERIFIED" ? new Date().toISOString() : undefined,
      verifiedBy: status === "VERIFIED" ? "admin@system.com" : undefined,
    };
  });
};

// Define the columns
const columns: ColumnDef<PropertyInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "code",
    header: "Property ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "lga",
    header: "LGA",
    cell: ({ row }) => <div>{row.getValue("lga")}</div>,
  },
  {
    accessorKey: "propertyType",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("propertyType")}</div>,
  },
  {
    accessorKey: "propertyUse",
    header: "Use",
    cell: ({ row }) => <div>{row.getValue("propertyUse")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={
            status === "VERIFIED"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              : status === "PENDING"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : status === "REJECTED"
              ? "bg-red-100 text-red-800 hover:bg-red-200"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "estimatedValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("estimatedValue"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "annualLUC",
    header: "Annual LUC",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("annualLUC"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const property = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.id)}
            >
              Copy Property ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* In the actions cell, update the View Details dropdown menu item to use Link */}
            <DropdownMenuItem asChild>
              <Link href={`/properties/${property.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Property
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Generate Certificate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PropertiesDataTable({
  filter = "all",
  data: propertyData = [],
}: {
  filter?: string;
  data?: PropertyInterface[];
}) {
  // Use provided data or generate mock data if none provided
  const data = propertyData.length > 0 
    ? propertyData
    : generateMockData(100).filter((property) => {
        if (filter === "all") return true;
        return property.propertyUse.toLowerCase() === filter.toLowerCase();
      });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter properties..."
          value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("address")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
