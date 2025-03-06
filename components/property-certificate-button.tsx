"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
import { PropertyCertificate } from "@/components/property-certificate";
import type { Property } from "@/lib/types";

interface PropertyCertificateButtonProps {
  property: Property;
}

export function PropertyCertificateButton({
  property,
}: PropertyCertificateButtonProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  // Convert the property to the format expected by PropertyCertificate
  const certificateData = {
    address: property.address,
    area: property.area,
    owner: property.owner,
    ownerContact: property.ownerContact,
    type: property.type,
    usage: property.type, // Using type as usage since we don't have usage in the original data
    rooms: property.type === "Undeveloped Land" ? 0 : 4, // Default to 0 for undeveloped land
    landSize: property.landSize,
    zone: property.zone,
    description: `Property ID: ${property.id}`,
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowCertificate(true)}
      >
        <FileText className="h-4 w-4 mr-2" />
        View Certificate
      </Button>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogTitle>Property Certificate</DialogTitle>
          <ScrollArea className="h-[calc(90vh-80px)]">
            <PropertyCertificate property={certificateData} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
