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

// Define the property data type
type Property = {
  id: string;
  propertyId: string;
  address: string;
  lga: string;
  zone: string;
  type: string;
  use: string;
  ownerName: string;
  status: "verified" | "pending" | "disputed";
  registrationDate: string;
  value: number;
  luc: number;
  paymentStatus: "paid" | "unpaid" | "partial";
};

// Generate mock data
const generateMockData = (count: number): Property[] => {
  const propertyTypes = ["Land", "Building", "Mixed-use"];
  const propertyUses = [
    "Residential",
    "Commercial",
    "Industrial",
    "Government",
  ];
  const zones = [
    "Lagos Island",
    "Ikeja",
    "Lekki",
    "Surulere",
    "Ikorodu",
    "Badagry",
  ];
  const lgas = [
    "Lagos Island",
    "Ikeja",
    "Eti-Osa",
    "Surulere",
    "Ikorodu",
    "Badagry",
  ];
  const statuses = ["verified", "pending", "disputed"] as const;
  const paymentStatuses = ["paid", "unpaid", "partial"] as const;

  return Array.from({ length: count }, (_, i) => {
    const type =
      propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const use = propertyUses[Math.floor(Math.random() * propertyUses.length)];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const lga = lgas[Math.floor(Math.random() * lgas.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentStatus =
      paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    const value = Math.floor(Math.random() * 100000000) + 1000000; // Between 1M and 100M
    const luc = Math.floor(value * 0.005); // 0.5% of property value

    return {
      id: `id-${i + 1}`,
      propertyId: `LGS-${100000 + i}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${zone} Road, ${lga}`,
      lga,
      zone,
      type,
      use,
      ownerName: [
        "John Doe",
        "Jane Smith",
        "David Adeyemi",
        "Sarah Johnson",
        "Michael Chen",
      ][Math.floor(Math.random() * 5)],
      status,
      registrationDate: new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      )
        .toISOString()
        .split("T")[0],
      value,
      luc,
      paymentStatus,
    };
  });
};

// Define the columns
const columns: ColumnDef<Property>[] = [
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
    accessorKey: "propertyId",
    header: "Property ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("propertyId")}</div>
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
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <div>{row.getValue("zone")}</div>,
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={
            status === "verified"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "value",
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
      const amount = Number.parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "luc",
    header: "LUC",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("luc"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;

      return (
        <Badge
          className={
            status === "paid"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              : status === "partial"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
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
}: {
  filter?: string;
}) {
  // Generate mock data
  const data = generateMockData(100).filter((property) => {
    if (filter === "all") return true;
    return property.use.toLowerCase() === filter.toLowerCase();
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
