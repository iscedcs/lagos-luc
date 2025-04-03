"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Define the payment data type
type Payment = {
  id: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  email: string;
  propertyId: string;
  propertyAddress: string;
  paymentDate: string;
  paymentMethod: string;
};

// Generate mock data
const data: Payment[] = Array.from({ length: 50 }).map((_, i) => {
  const statuses = ["completed", "pending", "failed", "refunded"] as const;
  const methods = ["Credit Card", "Bank Transfer", "Cash", "USSD"] as const;

  return {
    id: `PMT-${1000 + i}`,
    amount: Math.floor(Math.random() * 1000000) + 50000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `user${i}@example.com`,
    propertyId: `PROP-${2000 + i}`,
    propertyAddress: `${Math.floor(Math.random() * 200)} Lagos Street, ${
      ["Ikeja", "Lekki", "Victoria Island", "Ikoyi", "Yaba"][
        Math.floor(Math.random() * 5)
      ]
    }`,
    paymentDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      .toISOString()
      .split("T")[0],
    paymentMethod: methods[Math.floor(Math.random() * methods.length)],
  };
});

// Define the columns
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Payment ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "propertyId",
    header: "Property ID",
  },
  {
    accessorKey: "propertyAddress",
    header: "Property Address",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate"
        title={row.getValue("propertyAddress")}
      >
        {row.getValue("propertyAddress")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={cn(
            "capitalize",
            status === "completed" ? "bg-green-100 text-green-800" : "",
            status === "pending" ? "bg-yellow-100 text-yellow-800" : "",
            status === "failed" ? "bg-red-100 text-red-800" : "",
            status === "refunded" ? "bg-blue-100 text-blue-800" : ""
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View receipt</DropdownMenuItem>
            <DropdownMenuItem>View property details</DropdownMenuItem>
            {payment.status === "completed" && (
              <DropdownMenuItem className="text-red-600">
                Issue refund
              </DropdownMenuItem>
            )}
            {payment.status === "pending" && (
              <DropdownMenuItem>Mark as paid</DropdownMenuItem>
            )}
            {payment.status === "failed" && (
              <DropdownMenuItem>Retry payment</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Helper function for conditional class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function PaymentsDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
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
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} payments
        </div>
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
  );
}
