"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Download, Printer, Share2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

interface PaymentReceiptProps {
  property: Property;
}

export function PaymentReceipt({ property }: PaymentReceiptProps) {
  // Generate a receipt number based on property ID
  const receiptNumber = `LUC-${property.id}-${new Date().getFullYear()}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <CreditCard className="h-4 w-4 mr-2" />
          View Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment Documentation</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="receipt">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="receipt">Receipt</TabsTrigger>
            <TabsTrigger value="certificate">LUC Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="receipt" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      Lagos State Government
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Land Use Charge Receipt
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Receipt #: {receiptNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date:{" "}
                      {property.lastPaymentDate
                        ? formatDate(property.lastPaymentDate)
                        : formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Property</p>
                    <p className="font-medium">{property.address}</p>
                    <p className="text-sm">{property.area}, Lagos</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{property.owner}</p>
                    <p className="text-sm">{property.ownerContact}</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Land Use Charge {new Date().getFullYear()}</span>
                    <span>{formatCurrency(property.amountDue)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Penalty</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(property.amountDue)}</span>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground mb-4">
                  <p>
                    This receipt serves as proof of payment for Land Use Charge
                    for the year {new Date().getFullYear()}.
                  </p>
                  <p>Thank you for your payment.</p>
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificate" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">
                    LAND USE CHARGE CERTIFICATE
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Lagos State Government
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Certificate Number
                      </p>
                      <p className="font-medium">
                        LUC-CERT-{property.id}-{new Date().getFullYear()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date Issued
                      </p>
                      <p className="font-medium">
                        {property.lastPaymentDate
                          ? formatDate(property.lastPaymentDate)
                          : formatDate(new Date().toISOString())}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Property Address
                    </p>
                    <p className="font-medium">
                      {property.address}, {property.area}, Lagos
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Property Owner
                    </p>
                    <p className="font-medium">{property.owner}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Property Type
                    </p>
                    <p className="font-medium">{property.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Land Size</p>
                    <p className="font-medium">{property.landSize} sqm</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="font-medium">
                      {formatCurrency(property.amountDue)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">
                      December 31, {new Date().getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md mb-6 text-center">
                  <p className="text-sm">
                    This certificate confirms that the Land Use Charge for the
                    above property has been fully paid for the year{" "}
                    {new Date().getFullYear()}.
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
