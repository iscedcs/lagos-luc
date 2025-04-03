"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"
import Image from "next/image"

interface PaymentReceiptViewProps {
  payment: any
  property: any
}

export default function PaymentReceiptView({ payment, property }: PaymentReceiptViewProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handlePrint = () => {
    const printContent = receiptRef.current?.innerHTML
    const originalContent = document.body.innerHTML

    if (printContent) {
      document.body.innerHTML = `
        <html>
          <head>
            <title>Payment Receipt - ${payment.receiptNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              .receipt-header {
                text-align: center;
                margin-bottom: 20px;
              }
              .receipt-body {
                margin-bottom: 30px;
              }
              .receipt-footer {
                margin-top: 50px;
                text-align: center;
                font-size: 12px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
              }
              .amount {
                font-weight: bold;
                font-size: 18px;
              }
              .logo-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
              }
              .logo {
                max-width: 100px;
                max-height: 100px;
              }
              .center-content {
                text-align: center;
                flex: 1;
              }
            </style>
          </head>
          <body>
            ${printContent}
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
          Print Receipt
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div ref={receiptRef} className="bg-white p-6 border rounded-lg">
        <div className="receipt-header text-center mb-6">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 relative">
              <Image
                src="https://lagosstate.gov.ng/static/media/lasg__logo.a2c220a60f6e22b1113d.png"
                alt="Lagos State Logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">LAGOS STATE GOVERNMENT</h2>
              <h3 className="text-lg font-medium">LAND USE CHARGE DEPARTMENT</h3>
              <h4 className="text-base font-medium mt-2">OFFICIAL PAYMENT RECEIPT</h4>
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
        </div>

        <div className="receipt-body space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Receipt Number</p>
              <p className="text-base font-semibold">{payment.receiptNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-base font-semibold">{new Date(payment.date).toLocaleDateString()}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Property Information</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium">Property ID:</p>
                <p className="text-base">{property.propertyId}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address:</p>
                <p className="text-base">{property.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Owner:</p>
                <p className="text-base">{property.ownerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Zone:</p>
                <p className="text-base">{property.zone}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Payment Details</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium">Description:</p>
                <p className="text-base">{payment.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Method:</p>
                <p className="text-base">{payment.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Reference:</p>
                <p className="text-base">{payment.reference}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Paid By:</p>
                <p className="text-base">{payment.paidBy}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Amount Paid:</p>
            </div>
            <div>
              <p className="text-xl font-bold">{formatCurrency(payment.amount)}</p>
            </div>
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium">Payment Status:</p>
            <p className="text-base font-semibold capitalize">{payment.status}</p>
          </div>
        </div>

        <div className="receipt-footer mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            This is an official receipt for Land Use Charge payment. Keep this receipt for your records.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            For inquiries, contact: Land Use Charge Department, Lagos State Government
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Email: luc@lagospropertymap.gov.ng | Phone: +234 (0) 700 LAGOS LUC
          </p>

          <div className="mt-8 border-t pt-4">
            <p className="text-xs text-muted-foreground">Receipt generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

