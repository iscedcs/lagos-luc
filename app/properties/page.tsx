import Link from "next/link";
import { fetchProperties } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

export default async function PropertiesPage() {
  // Fetch properties from the API
  const properties = await fetchProperties();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-muted-foreground">
            Manage and view all registered properties
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/properties/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and filter section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by address, owner, or ID..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-2">
                <option value="">All Areas</option>
                <option value="Ikoyi">Ikoyi</option>
                <option value="Lekki">Lekki</option>
                <option value="Victoria Island">Victoria Island</option>
                <option value="Ikeja">Ikeja</option>
              </select>
              <select className="border rounded-md px-3 py-2">
                <option value="">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Mixed Use">Mixed Use</option>
              </select>
              <select className="border rounded-md px-3 py-2">
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="owing">Owing</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="h-40 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-muted-foreground opacity-50">
                  {property.id}
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    property.paymentStatus === "paid"
                      ? "default"
                      : "destructive"
                  }
                >
                  {property.paymentStatus === "paid" ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" /> Paid
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" /> Owing
                    </>
                  )}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1 truncate">
                {property.address}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                {property.area}, Lagos
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Owner:</span>
                  <p className="font-medium truncate">{property.owner}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium">{property.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Land Size:</span>
                  <p className="font-medium">{property.landSize} sqm</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-medium">
                    {formatCurrency(property.amountDue)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {property.paymentStatus === "paid"
                    ? `Paid on ${formatDate(property.lastPaymentDate || "")}`
                    : `Due on ${formatDate(property.dueDate)}`}
                </div>
                <Link href={`/properties/${property.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
