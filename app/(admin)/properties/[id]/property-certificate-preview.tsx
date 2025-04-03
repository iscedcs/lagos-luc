"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer } from "lucide-react"
import QRCode from "react-qr-code"
import Image from "next/image"

interface PropertyCertificatePreviewProps {
  property: any
}

export default function PropertyCertificatePreview({ property }: PropertyCertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handlePrint = () => {
    const printContent = certificateRef.current?.innerHTML
    const originalContent = document.body.innerHTML

    if (printContent) {
      document.body.innerHTML = `
        <html>
          <head>
            <title>Property Certificate - ${property.propertyId}</title>
            <style>
              @page {
                size: A4 landscape;
                margin: 0;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .certificate-container {
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
              }
              .certificate {
                width: 100%;
                height: 100%;
                border: 8px double #10b981;
                padding: 20px;
                box-sizing: border-box;
              }
              .certificate-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
              }
              .certificate-title {
                text-align: center;
                flex: 1;
              }
              .certificate-logo {
                width: 80px;
                height: 80px;
              }
              .certificate-content {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 20px;
              }
              .certificate-section {
                margin-bottom: 15px;
              }
              .certificate-section-title {
                font-size: 14px;
                font-weight: bold;
                color: #6b7280;
                margin-bottom: 5px;
                text-transform: uppercase;
              }
              .certificate-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
              }
              .certificate-field {
                margin-bottom: 10px;
              }
              .certificate-field-label {
                font-size: 12px;
                color: #6b7280;
              }
              .certificate-field-value {
                font-size: 14px;
                font-weight: 500;
              }
              .certificate-qr {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
              }
              .certificate-signature {
                text-align: center;
                margin-top: 20px;
              }
              .certificate-signature-line {
                width: 200px;
                border-bottom: 1px dashed #6b7280;
                margin: 0 auto 10px;
              }
              .certificate-footer {
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="certificate-container">
              ${printContent}
            </div>
          </body>
        </html>
      `

      window.print()
      document.body.innerHTML = originalContent
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Certificate
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <div ref={certificateRef} className="w-full p-6 bg-white landscape" style={{ minWidth: "800px" }}>
            <div className="border-8 border-double border-emerald-600 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="w-20 h-20 relative">
                  <Image
                    src="https://lagosstate.gov.ng/static/media/lasg__logo.a2c220a60f6e22b1113d.png"
                    alt="Lagos State Logo"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="text-center flex-1">
                  <h1 className="text-2xl font-bold text-emerald-800">LAGOS STATE GOVERNMENT</h1>
                  <h2 className="text-xl font-semibold">LAND USE CHARGE DEPARTMENT</h2>
                  <h3 className="text-lg font-medium mt-1">PROPERTY REGISTRATION CERTIFICATE</h3>
                </div>
                <div className="w-20 h-20 relative">
                  <Image
                    src="https://revenue.lagosstate.gov.ng/assets/image/newlogo.png"
                    alt="LIRS Logo"
                    width={80}
                    height={80}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div className="border-b pb-2">
                    <h4 className="text-sm font-semibold text-gray-500">PROPERTY IDENTIFICATION</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Property ID:</p>
                        <p className="text-lg font-bold">{property.propertyId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Registration Date:</p>
                        <p>{new Date(property.registrationDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-2">
                    <h4 className="text-sm font-semibold text-gray-500">PROPERTY DETAILS</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Address:</p>
                        <p>{property.address}</p>
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
                        <p>{property.zone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Property Type:</p>
                        <p>{property.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Property Use:</p>
                        <p>{property.use}</p>
                      </div>
                      {property.type === "Building" || property.type === "Mixed-use" ? (
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
                          <p>{property.totalLandArea || "N/A"} sqm</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-b pb-2">
                    <h4 className="text-sm font-semibold text-gray-500">OWNER INFORMATION</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Owner Name:</p>
                        <p>{property.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ownership Type:</p>
                        <p>{property.ownerType}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">VALUATION & CHARGES</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium">Property Value:</p>
                        <p className="font-bold">{formatCurrency(property.value)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Annual Land Use Charge:</p>
                        <p className="font-bold text-emerald-700">{formatCurrency(property.luc)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Valid Until:</p>
                        <p>{new Date(property.paymentDue).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Status:</p>
                        <p className="text-emerald-600 font-medium capitalize">{property.paymentStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-2 border">
                      <QRCode value={`LGS-PROP-${property.propertyId}`} size={150} />
                    </div>
                    <p className="text-xs text-center mt-2">Scan to verify property details</p>
                  </div>

                  <div className="text-center mt-8">
                    <div className="h-20 mb-2 mx-auto border-b border-dashed border-gray-300 w-48"></div>
                    <p className="font-medium">Authorized Signature</p>
                    <p className="text-sm text-gray-500">Director, Land Use Charge</p>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">
                      This certificate serves as proof of property registration and payment of Land Use Charge.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">For verification, visit: www.lagospropertymap.gov.ng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

