"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Building,
  User,
  MapPin,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  History,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PropertyPanelProps {
  property: any;
  onClose: () => void;
}

export default function PropertyPanel({
  property,
  onClose,
}: PropertyPanelProps) {
  const [showLucBreakdown, setShowLucBreakdown] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get compliance status icon and color
  const getComplianceStatusInfo = () => {
    switch (property.complianceStatus) {
      case "compliant":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
          label: "Compliant",
        };
      case "partial":
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-amber-100 text-amber-800 hover:bg-amber-200",
          label: "Partial",
        };
      case "defaulting":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: "bg-red-100 text-red-800 hover:bg-red-200",
          label: "Defaulting",
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          label: "Unknown",
        };
    }
  };

  const complianceInfo = getComplianceStatusInfo();

  return (
    <div className="absolute top-4 left-4 z-10 w-full max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{property.propertyId}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className={complianceInfo.color}>
              {complianceInfo.icon}
              <span className="ml-1">{complianceInfo.label}</span>
            </Badge>
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">{property.use}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Owner</p>
                <p className="text-sm text-muted-foreground">
                  {property.ownerName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {property.address}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates: {property.coordinates.lat.toFixed(6)},{" "}
                  {property.coordinates.lng.toFixed(6)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Zone</p>
                <p className="text-sm text-muted-foreground">{property.zone}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">Land Use Charge</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLucBreakdown(!showLucBreakdown)}
              >
                {showLucBreakdown ? "Hide" : "Show"} Breakdown
              </Button>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Annual LUC:</p>
              <p className="font-bold">{formatCurrency(property.luc)}</p>
            </div>

            {showLucBreakdown && (
              <div className="mt-4 space-y-2 bg-muted p-3 rounded-md text-sm">
                <div className="flex justify-between">
                  <p>Property Value:</p>
                  <p className="font-medium">
                    {formatCurrency(property.value)}
                  </p>
                </div>

                <Separator className="my-2" />

                <div className="space-y-1">
                  <p className="font-medium">Valuation Factors:</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex justify-between">
                      <p>Location Class:</p>
                      <p>{property.locationClass}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Location Weight:</p>
                      <p>{property.locationWeight.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Use Weight:</p>
                      <p>{property.useWeight.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Type Weight:</p>
                      <p>{property.typeWeight.toFixed(2)}</p>
                    </div>
                    {property.type !== "Land" && (
                      <div className="flex justify-between">
                        <p>Building Factor:</p>
                        <p>{property.buildingFactor.toFixed(2)}</p>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <p>Area Factor:</p>
                      <p>{property.areaFactor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between font-medium">
                  <p>LUC Rate (0.5%):</p>
                  <p>0.005</p>
                </div>

                <div className="flex justify-between font-bold">
                  <p>Annual LUC:</p>
                  <p>{formatCurrency(property.luc)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/properties/${property.id}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/properties/${property.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>

          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
