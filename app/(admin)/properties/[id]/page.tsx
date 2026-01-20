import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building,
  Calendar,
  MapPin,
  Printer,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import PropertyDetailsSection from "./property-details-section";
import PropertyLocationSection from "./property-location-section";
import PropertyOwnerSection from "./property-owner-section";
import PropertyValuationSection from "./property-valuation-section";
import PropertyPaymentHistory from "./property-payment-history";
import PropertyDocuments from "./property-documents";
import PropertyActivityLog from "./property-activity-log";
import PropertyCertificatePreview from "./property-certificate-preview";
import EditPropertyModal from "./edit-property-modal";
import DeletePropertyDialog from "./delete-property-dialog";
import { getPropertyById } from "@/actions/properties";

export const metadata: Metadata = {
  title: "Property Details | Lagos Property Map",
  description: "Detailed view of property in the Lagos Property Map system",
};

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const propertyData = await getPropertyById(id);

  // Log the raw property data from API
  console.log("=== PROPERTY DATA FROM API ===");
  console.log(JSON.stringify(propertyData, null, 2));
  console.log("=== END PROPERTY DATA ===");

  if (!propertyData) {
    notFound();
  }

  // Map API data to component props - handle nested owner and zone data
  const property = {
    id: propertyData.id,
    propertyId: propertyData.code,
    address: propertyData.address,
    lga: propertyData.lga,
    lcda: propertyData.lcda,
    ward: propertyData.ward,
    zone: propertyData.zone?.zoneName || "N/A",
    gpsCoordinates: {
      latitude: 6.4281, // Default to Lekki coordinates
      longitude: 3.4219,
    },
    type: propertyData.propertyType,
    use: propertyData.propertyUse,
    buildingType: propertyData.buildingType,
    numberOfUnits: propertyData.numberOfUnits,
    buildingHeight: propertyData.buildingHeight,
    totalCoveredArea: propertyData.coveredArea,
    yearOfConstruction: propertyData.yearBuilt,
    buildingCondition: propertyData.condition,
    ownerName: propertyData.owner 
      ? `${propertyData.owner.firstName} ${propertyData.owner.lastName}`
      : "N/A",
    ownerType: propertyData.ownershipType,
    ownerContact: {
      email: propertyData.owner?.email || "N/A",
      phone: propertyData.owner?.phone || "N/A",
      address: propertyData.address,
    },
    ownerRepresentative: {
      name: propertyData.owner 
        ? `${propertyData.owner.firstName} ${propertyData.owner.lastName}`
        : "N/A",
      position: propertyData.owner?.role || "N/A",
      email: propertyData.owner?.email || "N/A",
      phone: propertyData.owner?.phone || "N/A",
    },
    registrationDate: propertyData.createdAt,
    lastUpdated: propertyData.updatedAt,
    status: propertyData.status?.toLowerCase() || "pending",
    verificationDate: propertyData.verifiedAt,
    verifiedBy: propertyData.verifiedBy || "N/A",
    value: propertyData.estimatedValue,
    luc: propertyData.annualLUC,
    paymentStatus: "unpaid",
    paymentDue: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    locationClass: propertyData.locationClass,
    locationWeight: propertyData.locationWeight,
    useWeight: propertyData.useWeight,
    typeWeight: propertyData.typeWeight,
    buildingFactor: propertyData.buildingFactor,
    areaFactor: propertyData.areaFactor,
    documents: [],
    payments: [],
    activityLog: [],
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link href="/properties">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Properties
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {property.propertyId}
          </h2>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground">{property.address}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={
              property.status === "verified"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : property.status === "pending"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            {property.status.charAt(0).toUpperCase() +
              property.status.slice(1)}
          </Badge>
          <Badge
            className={
              property.paymentStatus === "paid"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : property.paymentStatus === "partial"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            Payment:{" "}
            {property.paymentStatus.charAt(0).toUpperCase() +
              property.paymentStatus.slice(1)}
          </Badge>
          <EditPropertyModal property={property} />
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Printer className="mr-2 h-4 w-4" />
            Print Certificate
          </Button>
          <DeletePropertyDialog propertyId={property.id} propertyCode={property.propertyId} />
        </div>
      </div>

      {/* Property Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full p-2 bg-emerald-100">
              <Building className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Property Type</p>
              <p className="text-lg font-bold">
                {property.type} - {property.use}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full p-2 bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Owner</p>
              <p className="text-lg font-bold truncate max-w-[180px]">
                {property.ownerName}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full p-2 bg-purple-100">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Zone</p>
              <p className="text-lg font-bold">{property.zone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full p-2 bg-amber-100">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Registered</p>
              <p className="text-lg font-bold">
                {new Date(property.registrationDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <PropertyDetailsSection property={property} />
            <PropertyLocationSection property={property} />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <PropertyOwnerSection property={property} />
            <PropertyValuationSection property={property} />
          </div>
        </TabsContent>

        <TabsContent value="payments" className="pt-4">
          <PropertyPaymentHistory property={property} />
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          <PropertyDocuments property={property} />
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <PropertyActivityLog property={property} />
        </TabsContent>

        <TabsContent value="certificate" className="pt-4">
          <PropertyCertificatePreview property={property} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
