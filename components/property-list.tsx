"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  MapPin,
} from "lucide-react";
import type { Property } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertyListProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedProperty: Property | null;
  onSearch: (query: string) => void;
  searchQuery: string;
  isSearching: boolean;
}

export function PropertyList({
  properties,
  onPropertySelect,
  selectedProperty,
  onSearch,
  searchQuery,
  isSearching,
}: PropertyListProps) {
  const [sortField, setSortField] = useState<keyof Property>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Property) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProperties = [...properties].sort((a, b) => {
    // @ts-expect-error: expect error
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    // @ts-expect-error: expect error
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            {isSearching ? (
              <span className="flex items-center">
                <span className="h-2 w-2 mr-2 rounded-full bg-primary animate-pulse"></span>
                Searching...
              </span>
            ) : (
              `Showing ${sortedProperties.length} properties`
            )}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort by
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("id")}>
                ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("address")}>
                Address
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("area")}>
                Area
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("owner")}>
                Owner
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("landSize")}>
                Land Size
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("amountDue")}>
                Amount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProperties.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  {isSearching ? "Searching..." : "No properties found"}
                </TableCell>
              </TableRow>
            ) : (
              sortedProperties.map((property) => (
                <TableRow
                  key={property.id}
                  className={
                    selectedProperty?.id === property.id ? "bg-muted" : ""
                  }
                  onClick={() => onPropertySelect(property)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className="font-medium">{property.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{property.address}</div>
                      <div className="text-sm text-muted-foreground">
                        {property.area}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(property.amountDue)}
                  </TableCell>
                  <TableCell className="text-center">
                    {property.paymentStatus === "paid" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Owing
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPropertySelect(property);
                      }}
                      title="View on map"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
