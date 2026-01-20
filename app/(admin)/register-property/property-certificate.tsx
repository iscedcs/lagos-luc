"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Printer, X } from "lucide-react"
import QRCode from "react-qr-code"
import Image from "next/image";
import { ar } from "zod/v4/locales"

interface PropertyCertificateProps {
  property: any
  onClose: () => void
}

export default function PropertyCertificate({ property, onClose }: PropertyCertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    setIsDownloading(true)

    // In a real app, we would generate a PDF here
    // For now, we'll just simulate a download
    setTimeout(() => {
      setIsDownloading(false)
      alert("Certificate downloaded successfully")
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 print:hidden">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex justify-end gap-2 p-4 bg-gray-100 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownload} disabled={isDownloading}>
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
      </div>

      <div className="p-8 bg-white landscape" id="certificate">
        <div className="border-8 border-double border-emerald-600 p-6 min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <Image
                  src="/lagos.png"
                  alt="Lagos State Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-emerald-800">
                LAGOS STATE GOVERNMENT
              </h1>
              <h2 className="text-xl font-semibold">
                LAND USE CHARGE DEPARTMENT
              </h2>
              <h3 className="text-lg font-medium mt-1">
                PROPERTY REGISTRATION CERTIFICATE
              </h3>
            </div>
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <Image
                  src="/lirs.png"
                  alt="LIRS Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="border-b pb-2">
                <h4 className="text-sm font-semibold text-gray-500">
                  PROPERTY IDENTIFICATION
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium">Property ID:</p>
                    <p className="text-lg font-bold">{property.propertyId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Registration Date:</p>
                    <p>{formatDate(property.registrationDate)}</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-2">
                <h4 className="text-sm font-semibold text-gray-500">
                  PROPERTY DETAILS
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium">Address:</p>
                    <p>{property.streetAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">LGA/LCDA:</p>
                    <p>
                      {property.lga} / {property.lcda || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ward:</p>
                    <p>{property.ward}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location Zone:</p>
                    <p>{property.locationZone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Property Type:</p>
                    <p>{property.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Property Use:</p>
                    <p>{property.propertyUse}</p>
                  </div> 
                  {property.propertyType === "Building" ||
                  property.propertyType === "Mixed-use" ? (
                    <>
                      <div>
                        <p className="text-sm font-medium">Building Type:</p>
                        <p>{property.buildingType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Area:</p>
                        <p>{property.totalCoveredArea} sqm</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Land Area:</p>
                      <p>{property.totalLandArea} sqm</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b pb-2">
                <h4 className="text-sm font-semibold text-gray-500">
                  OWNER INFORMATION
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium">Owner Name:</p>
                    <p>{property.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ownership Type:</p>
                    <p>{property.ownershipType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500">
                  VALUATION & CHARGES
                </h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium">Property Value:</p>
                    <p className="font-bold">
                      ₦
                      {new Intl.NumberFormat().format(
                        Number.parseFloat(calculatePropertyValue(property))
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Annual Land Use Charge:
                    </p>
                    <p className="font-bold text-emerald-700">
                      ₦
                      {new Intl.NumberFormat().format(
                        Number.parseFloat(calculateLUC(property))
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Valid Until:</p>
                    <p>{formatDate(property.expiryDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Status:</p>
                    <p className="text-emerald-600 font-medium">PAID</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="bg-white p-2 border">
                  <QRCode value={property.qrCodeData} size={150} />
                </div>
                <p className="text-xs text-center mt-2">
                  Scan to verify property details
                </p>
              </div>

              <div className="text-center mt-8">
                <div className="h-20 mb-2 mx-auto border-b border-dashed border-gray-300 w-48"></div>
                <p className="font-medium">Authorized Signature</p>
                <p className="text-sm text-gray-500">
                  Director, Land Use Charge
                </p>
              </div>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  This certificate serves as proof of property registration and
                  payment of Land Use Charge.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  For verification, visit: www.lagospropertymap.gov.ng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions to calculate property value and LUC
function calculatePropertyValue(property: any) {
  const locationWeight = property.locationWeight || 1.0
  const useWeight = property.useWeight || 0.5
  const typeWeight = property.typeWeight || 1.0
  const buildingFactor = property.buildingFactor || 1.0
  const areaFactor = property.areaFactor || 1.0

  const area = property.propertyType === "Land" ? property.totalLandArea || 0 : property.totalCoveredArea || 0

  const baseRate = 350 // Naira per sqm - base rate

  let estimatedValue = area * baseRate * locationWeight * useWeight * typeWeight * areaFactor

  if (property.propertyType !== "Land") {
    estimatedValue *= buildingFactor
  }

  return estimatedValue.toFixed(2)
}

function calculateLUC(property: any) {
  const propertyValue = Number.parseFloat(calculatePropertyValue(property))
  const lucRate = 0.005 // 0.5%
  return (propertyValue * lucRate).toFixed(2)
}

      

