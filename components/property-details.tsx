import {
  X,
  Home,
  MapPin,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

export function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  return (
    <Card className="shadow-lg animate-in fade-in slide-in-from-right-5 duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Property Details
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">{property.address}</h3>
              <p className="text-sm text-muted-foreground">
                {property.area}, Lagos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">
              {property.center[0].toFixed(6)}, {property.center[1].toFixed(6)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Property Type</p>
            <p className="text-sm font-medium">{property.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Land Size</p>
            <p className="text-sm font-medium">{property.landSize} sqm</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Property ID</p>
            <p className="text-sm font-medium">{property.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Zone</p>
            <p className="text-sm font-medium">{property.zone}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">{property.owner}</h3>
              <p className="text-sm text-muted-foreground">
                {property.ownerContact}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="font-medium">Payment Status</h3>
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={
                property.paymentStatus === "paid"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {property.paymentStatus === "paid" ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertCircle className="h-3 w-3 mr-1" />
              )}
              {property.paymentStatus === "paid" ? "Cleared" : "Owing"}
            </Badge>
            <div className="text-right">
              <p className="text-sm font-medium">
                {formatCurrency(property.amountDue)}
              </p>
              {property.paymentStatus === "paid" ? (
                <p className="text-xs text-muted-foreground">
                  Paid on {formatDate(String(property.lastPaymentDate))}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Due on {formatDate(property.dueDate)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2">
          {property.paymentStatus === "paid" ? (
            <Button variant="outline" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              View Receipt
            </Button>
          ) : (
            <Button className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
