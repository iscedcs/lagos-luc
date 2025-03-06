"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PropertyCertificateProps {
  property: {
    address: string;
    area: string;
    owner: string;
    ownerContact: string;
    type: string;
    usage: string;
    rooms: number;
    landSize: number;
    zone: string;
    description?: string;
  };
}

export function PropertyCertificate({ property }: PropertyCertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Generate a unique property ID
  const propertyId = `LG-${Date.now().toString().slice(-8)}`;

  // Format the current date
  const currentDate = new Date().toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Generate QR code URL - using a placeholder service
  // In a real app, you would generate this with your own data
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `Lagos Property Certificate: ${propertyId}\nAddress: ${property.address}, ${property.area}\nOwner: ${property.owner}`
  )}`;

  // Handle print function
  const handlePrint = () => {
    window.print();
  };

  // Handle download as PDF
  const handleDownload = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);

    try {
      // Create a canvas from the certificate element
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Lagos_Property_Certificate_${propertyId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!navigator.share) {
      alert("Sharing is not supported on this browser");
      return;
    }

    try {
      await navigator.share({
        title: "Lagos Property Certificate",
        text: `Property Certificate for ${property.address}, ${property.area}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div
      className="bg-white p-8 rounded-lg border-8 border-double border-gray-200 print:border-0"
      ref={certificateRef}
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          {/* Lagos State Logo */}
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Lagos State Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          Property Registration Certificate
        </h1>
        <p className="text-sm text-gray-600">Lagos State Government</p>
      </div>

      <div className="border-t-2 border-b-2 border-gray-300 py-4 my-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Certificate Number</p>
            <p className="font-bold">{propertyId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date Issued</p>
            <p className="font-bold">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Property Details</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm text-gray-600">Property Address</p>
            <p className="font-medium">
              {property.address}, {property.area}, Lagos
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Property Owner</p>
            <p className="font-medium">{property.owner}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Contact Email</p>
            <p className="font-medium">{property.ownerContact}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Property Type</p>
            <p className="font-medium">{property.type}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Property Usage</p>
            <p className="font-medium">{property.usage}</p>
          </div>

          {property.type !== "Undeveloped Land" && (
            <div>
              <p className="text-sm text-gray-600">Number of Rooms</p>
              <p className="font-medium">{property.rooms}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-600">Land Size</p>
            <p className="font-medium">{property.landSize} sqm</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Zone</p>
            <p className="font-medium">{property.zone}</p>
          </div>
        </div>

        {property.description && (
          <div>
            <p className="text-sm text-gray-600">Additional Information</p>
            <p className="font-medium">{property.description}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-6 text-center">
        <p className="text-sm">
          This certificate confirms that the above property has been registered
          with the Lagos State Government in accordance with the Land Use Act
          and is subject to applicable Land Use Charge.
        </p>
      </div>

      <div className="flex justify-between items-end mt-8">
        <div className="max-w-[200px]">
          {/* Lagos State Stamp */}
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-2 opacity-80">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Lagos State Stamp"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <p className="text-xs text-gray-500">Official Stamp</p>
        </div>

        <div className="text-center">
          {/* QR Code */}
          <div className="h-24 w-24 mb-2">
            <Image
              src={qrCodeUrl || "/placeholder.svg"}
              alt="Certificate QR Code"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <p className="text-xs text-gray-500">Scan to verify</p>
        </div>

        <div className="text-center">
          {/* LIRS Chairman's Signature */}
          <div className="h-16 mb-2">
            <Image
              src="/placeholder.svg?height=64&width=200"
              alt="Chairman's Signature"
              width={200}
              height={64}
              className="object-contain"
            />
          </div>
          <p className="font-medium">Dr. Ayodele Subair</p>
          <p className="text-xs text-gray-500">Executive Chairman, LIRS</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8 print:hidden">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
