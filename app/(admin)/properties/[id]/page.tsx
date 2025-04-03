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

// Mock function to get property data
function getPropertyData(id: string) {
  // In a real app, this would fetch from an API or database
  return {
    id,
    propertyId: `LGS-${id.padStart(6, "0")}`,
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    lga: "Eti-Osa",
    lcda: "Lekki",
    ward: "Ward C",
    zone: "Lekki Phase 1",
    gpsCoordinates: {
      latitude: 6.4281,
      longitude: 3.4219,
    },
    type: "Building",
    use: "Commercial",
    buildingType: "Office Complex",
    numberOfFloors: 4,
    numberOfUnits: 12,
    totalCoveredArea: 2500,
    yearOfConstruction: 2015,
    buildingCondition: "Good",
    ownerName: "Lagos Business Solutions Ltd",
    ownerType: "Corporate",
    ownerContact: {
      email: "info@lagosbs.com",
      phone: "+234 812 345 6789",
      address: "25 Marina Street, Lagos Island",
    },
    ownerRepresentative: {
      name: "David Adeyemi",
      position: "Managing Director",
      email: "david@lagosbs.com",
      phone: "+234 802 123 4567",
    },
    registrationDate: "2022-05-15",
    lastUpdated: "2023-11-20",
    status: "verified",
    verificationDate: "2022-06-10",
    verifiedBy: "John Okafor",
    value: 450000000,
    luc: 2250000,
    paymentStatus: "paid",
    paymentDue: "2024-05-15",
    locationClass: "High",
    locationWeight: 1.4,
    useWeight: 1.0,
    typeWeight: 1.2,
    buildingFactor: 1.1,
    areaFactor: 1.3,
    documents: [
      {
        id: "doc1",
        name: "Deed of Assignment",
        type: "pdf",
        uploadDate: "2022-05-15",
        status: "verified",
      },
      {
        id: "doc2",
        name: "Survey Plan",
        type: "pdf",
        uploadDate: "2022-05-15",
        status: "verified",
      },
      {
        id: "doc3",
        name: "Building Approval",
        type: "pdf",
        uploadDate: "2022-05-15",
        status: "verified",
      },
      {
        id: "doc4",
        name: "Property Photos",
        type: "zip",
        uploadDate: "2022-05-15",
        status: "verified",
      },
    ],
    payments: [
      {
        id: "pay1",
        amount: 2250000,
        date: "2023-05-10",
        method: "Bank Transfer",
        reference: "LUC-2023-12345",
        status: "completed",
        receiptNumber: "RCP-2023-12345",
        paidBy: "David Adeyemi",
        description: "Annual Land Use Charge 2023-2024",
      },
      {
        id: "pay2",
        amount: 2100000,
        date: "2022-05-12",
        method: "Bank Transfer",
        reference: "LUC-2022-54321",
        status: "completed",
        receiptNumber: "RCP-2022-54321",
        paidBy: "David Adeyemi",
        description: "Annual Land Use Charge 2022-2023",
      },
      {
        id: "pay3",
        amount: 1950000,
        date: "2021-05-08",
        method: "Bank Transfer",
        reference: "LUC-2021-67890",
        status: "completed",
        receiptNumber: "RCP-2021-67890",
        paidBy: "David Adeyemi",
        description: "Annual Land Use Charge 2021-2022",
      },
    ],
    activityLog: [
      {
        id: "act1",
        action: "Property Registered",
        user: "David Adeyemi",
        date: "2022-05-15",
        details: "Initial property registration",
      },
      {
        id: "act2",
        action: "Documents Uploaded",
        user: "David Adeyemi",
        date: "2022-05-15",
        details: "Uploaded 4 documents",
      },
      {
        id: "act3",
        action: "Verification Started",
        user: "John Okafor",
        date: "2022-05-20",
        details: "Started verification process",
      },
      {
        id: "act4",
        action: "Property Verified",
        user: "John Okafor",
        date: "2022-06-10",
        details: "Completed verification",
      },
      {
        id: "act5",
        action: "Payment Received",
        user: "System",
        date: "2022-06-15",
        details: "Payment of ₦1,950,000 received",
      },
      {
        id: "act6",
        action: "Certificate Generated",
        user: "System",
        date: "2022-06-15",
        details: "Property certificate generated",
      },
      {
        id: "act7",
        action: "Property Updated",
        user: "Sarah Johnson",
        date: "2023-11-20",
        details: "Updated property valuation",
      },
      {
        id: "act8",
        action: "Payment Received",
        user: "System",
        date: "2023-05-10",
        details: "Payment of ₦2,250,000 received",
      },
    ],
  };
}

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
  const propertyData = getPropertyData(id);

  if (!propertyData) {
    notFound();
  }

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
            {propertyData.propertyId}
          </h2>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground">{propertyData.address}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={
              propertyData.status === "verified"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : propertyData.status === "pending"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            {propertyData.status.charAt(0).toUpperCase() +
              propertyData.status.slice(1)}
          </Badge>
          <Badge
            className={
              propertyData.paymentStatus === "paid"
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                : propertyData.paymentStatus === "partial"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }
          >
            Payment:{" "}
            {propertyData.paymentStatus.charAt(0).toUpperCase() +
              propertyData.paymentStatus.slice(1)}
          </Badge>
          <EditPropertyModal property={propertyData} />
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Printer className="mr-2 h-4 w-4" />
            Print Certificate
          </Button>
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
                {propertyData.type} - {propertyData.use}
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
                {propertyData.ownerName}
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
              <p className="text-lg font-bold">{propertyData.zone}</p>
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
                {new Date(propertyData.registrationDate).toLocaleDateString()}
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
            <PropertyDetailsSection property={propertyData} />
            <PropertyLocationSection property={propertyData} />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <PropertyOwnerSection property={propertyData} />
            <PropertyValuationSection property={propertyData} />
          </div>
        </TabsContent>

        <TabsContent value="payments" className="pt-4">
          <PropertyPaymentHistory property={propertyData} />
        </TabsContent>

        <TabsContent value="documents" className="pt-4">
          <PropertyDocuments property={propertyData} />
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <PropertyActivityLog property={propertyData} />
        </TabsContent>

        <TabsContent value="certificate" className="pt-4">
          <PropertyCertificatePreview property={propertyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
