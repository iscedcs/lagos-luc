import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProperties } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Edit,
  Download,
  CreditCard,
  FileText,
  Home,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PropertyCertificateButton } from "@/components/property-certificate-button";
import { PaymentMethods } from "@/components/payment-methods";
import { PaymentReceipt } from "@/components/payment-receipt";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage(props: PropertyPageProps) {
  // Fetch all properties
  const properties = await fetchProperties();
  const id = (await props.params).id;

  // Find the property with the matching ID
  const property = properties.find((p) => p.id === Number.parseInt(id));

  // If property not found, return 404
  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Property Details</h1>
            <Badge
              variant={
                property.paymentStatus === "paid" ? "default" : "destructive"
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
          <p className="text-muted-foreground">ID: {property.id}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/properties">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
          <Link href={`/properties/${property.id}/edit`}>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main property details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      Property Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{property.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Area</p>
                        <p className="font-medium">{property.area}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{property.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Zone</p>
                        <p className="font-medium">{property.zone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Land Size
                        </p>
                        <p className="font-medium">{property.landSize} sqm</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Development Status
                        </p>
                        <p className="font-medium">
                          {property.type === "Undeveloped Land"
                            ? "Undeveloped"
                            : "Developed"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Owner Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Owner Name
                        </p>
                        <p className="font-medium">{property.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{property.ownerContact}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Amount Due
                      </p>
                      <p className="font-medium">
                        {formatCurrency(property.amountDue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">
                        {formatDate(property.dueDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Payment
                      </p>
                      <p className="font-medium">
                        {property.lastPaymentDate
                          ? formatDate(property.lastPaymentDate)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {property.paymentStatus === "paid" ? (
                    <PaymentReceipt property={property} />
                  ) : (
                    <PaymentMethods property={property} />
                  )}
                  <PropertyCertificateButton property={property} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Property Registered</p>
                    <p className="text-sm text-muted-foreground">
                      January 15, 2023
                    </p>
                  </div>
                </div>

                {property.paymentStatus === "paid" && (
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">
                        {property.lastPaymentDate
                          ? formatDate(property.lastPaymentDate)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Property Details Updated</p>
                    <p className="text-sm text-muted-foreground">
                      March 10, 2023
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-muted rounded-md flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-medium">
                    {property.center[0].toFixed(6)},{" "}
                    {property.center[1].toFixed(6)}
                  </p>
                </div>
                <Link href={`/map?property=${property.id}`}>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Property Details
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties
                  .filter(
                    (p) => p.area === property.area && p.id !== property.id
                  )
                  .slice(0, 3)
                  .map((relatedProperty) => (
                    <Link
                      href={`/properties/${relatedProperty.id}`}
                      key={relatedProperty.id}
                    >
                      <div className="flex items-start gap-2 group">
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                          <Home className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {relatedProperty.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {relatedProperty.area}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
