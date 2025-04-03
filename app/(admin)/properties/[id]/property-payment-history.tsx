"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download, Receipt } from "lucide-react"
import PaymentReceiptView from "./payment-receipt-view"

interface PropertyPaymentHistoryProps {
  property: any
}

export default function PropertyPaymentHistory({ property }: PropertyPaymentHistoryProps) {
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View all payments made for this property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {property.payments.map((payment: any) => (
                    <PaymentItem key={payment.id} payment={payment} onViewReceipt={() => setSelectedPayment(payment)} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <div className="space-y-4">
                  {property.payments
                    .filter((payment: any) => payment.status === "completed")
                    .map((payment: any) => (
                      <PaymentItem
                        key={payment.id}
                        payment={payment}
                        onViewReceipt={() => setSelectedPayment(payment)}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <div className="space-y-4">
                  {property.payments
                    .filter((payment: any) => payment.status === "pending")
                    .map((payment: any) => (
                      <PaymentItem
                        key={payment.id}
                        payment={payment}
                        onViewReceipt={() => setSelectedPayment(payment)}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="failed" className="mt-4">
                <div className="space-y-4">
                  {property.payments
                    .filter((payment: any) => payment.status === "failed")
                    .map((payment: any) => (
                      <PaymentItem
                        key={payment.id}
                        payment={payment}
                        onViewReceipt={() => setSelectedPayment(payment)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Payment Receipt Dialog */}
      <Dialog open={!!selectedPayment} onOpenChange={(open) => !open && setSelectedPayment(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              Receipt for payment made on {selectedPayment && new Date(selectedPayment.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && <PaymentReceiptView payment={selectedPayment} property={property} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PaymentItemProps {
  payment: any
  onViewReceipt: () => void
}

function PaymentItem({ payment, onViewReceipt }: PaymentItemProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{payment.receiptNumber}</p>
              <Badge
                className={
                  payment.status === "completed"
                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    : payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{payment.description}</p>
            <p className="text-sm text-muted-foreground">
              Paid on {new Date(payment.date).toLocaleDateString()} via {payment.method}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={onViewReceipt}>
                <Eye className="mr-2 h-4 w-4" />
                View Receipt
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

