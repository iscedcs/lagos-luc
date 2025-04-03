"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileText,
  Mail,
  Printer,
  Download,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Search,
} from "lucide-react";

// Mock data for invoice preview
const invoicePreview = {
  invoiceNumber: "INV-2023-12345",
  propertyId: "LG-IKJ-12345",
  owner: "Adebayo Johnson",
  address: "15 Awolowo Road, Ikeja",
  propertyType: "Single Family Home",
  assessedValue: 45000000,
  taxRate: 0.005,
  taxAmount: 225000,
  dueDate: "2023-12-31",
  paymentOptions: [
    "Bank Transfer",
    "Online Payment",
    "Mobile Payment",
    "Cash at Designated Centers",
  ],
  notes:
    "Please pay on or before the due date to avoid penalties. For inquiries, contact the Lagos Property Tax Office.",
};

export default function TaxInvoiceGenerator() {
  const [activeTab, setActiveTab] = useState("generate");
  const [showPreview, setShowPreview] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<
    "idle" | "generating" | "success" | "error"
  >("idle");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const handleGenerateInvoices = () => {
    setGenerationStatus("generating");
    // Simulate API call
    setTimeout(() => {
      setGenerationStatus("success");
    }, 2000);
  };

  const handlePreviewInvoice = () => {
    setShowPreview(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <Tabs
        defaultValue="generate"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <CardHeader>
          <CardTitle>Tax Invoice Generator</CardTitle>
          <CardDescription>
            Generate and manage property tax invoices
          </CardDescription>
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="batch">Batch Processing</TabsTrigger>
            <TabsTrigger value="history">Invoice History</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="generate" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property-search">Property ID or Address</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="property-search"
                    placeholder="Enter property ID or address"
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="owner-search">Property Owner</Label>
                <Input id="owner-search" placeholder="Enter owner name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="tax-year">Tax Year</Label>
                <Select defaultValue="2023">
                  <SelectTrigger id="tax-year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tax-period">Tax Period</Label>
                <Select defaultValue="annual">
                  <SelectTrigger id="tax-period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="due-date"
                    type="date"
                    className="pl-9"
                    defaultValue="2023-12-31"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="payment-options">Payment Options</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="payment-options">
                    <SelectValue placeholder="Select options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Methods</SelectItem>
                    <SelectItem value="bank">Bank Transfer Only</SelectItem>
                    <SelectItem value="online">Online Payment Only</SelectItem>
                    <SelectItem value="mobile">Mobile Payment Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="include-penalties" />
              <Label htmlFor="include-penalties">
                Include penalties for late payment
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="include-discounts" />
              <Label htmlFor="include-discounts">
                Apply early payment discount (5%)
              </Label>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePreviewInvoice}>
                <FileText className="mr-2 h-4 w-4" />
                Preview Invoice
              </Button>
              <Button onClick={handleGenerateInvoices}>Generate Invoice</Button>
            </div>
          </TabsContent>

          <TabsContent value="batch" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zone-filter">Zone</Label>
                <Select>
                  <SelectTrigger id="zone-filter">
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                    <SelectItem value="vi">Victoria Island</SelectItem>
                    <SelectItem value="ikoyi">Ikoyi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="property-type">Property Type</Label>
                <Select>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="batch-tax-year">Tax Year</Label>
                <Select defaultValue="2023">
                  <SelectTrigger id="batch-tax-year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="batch-due-date">Due Date</Label>
                <Input
                  id="batch-due-date"
                  type="date"
                  defaultValue="2023-12-31"
                />
              </div>
            </div>

            <div className="mt-4 p-4 border rounded-md">
              <h3 className="font-medium mb-2">
                Selected Properties: {selectedProperties.length}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProperties.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No properties selected. Use the filters above to select
                    properties.
                  </p>
                ) : (
                  <>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      LG-IKJ-12345
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      LG-LKI-23456
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      LG-VIC-34567
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      +{selectedProperties.length - 3} more
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="send-email" />
              <Label htmlFor="send-email">Send invoices via email</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="generate-pdf" defaultChecked />
              <Label htmlFor="generate-pdf">Generate PDF copies</Label>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
              <Button
                disabled={selectedProperties.length === 0}
                className={
                  selectedProperties.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                Generate Batch Invoices
              </Button>
            </div>

            <div
              className={`mt-4 p-4 rounded-md ${
                generationStatus === "idle"
                  ? "hidden"
                  : generationStatus === "generating"
                  ? "bg-blue-50 text-blue-700"
                  : generationStatus === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {generationStatus === "generating" && (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  Generating invoices... This may take a few moments.
                </div>
              )}
              {generationStatus === "success" && (
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Successfully generated 125 invoices. Ready for distribution.
                </div>
              )}
              {generationStatus === "error" && (
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error generating invoices. Please try again or contact
                  support.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="history-search">Search Invoices</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="history-search"
                    placeholder="Invoice number or property ID"
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="history-status">Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="history-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="history-date-range">Date Range</Label>
                <Select defaultValue="this-year">
                  <SelectTrigger id="history-date-range">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 border rounded-md p-4 text-center">
              <p className="text-gray-500">
                Select filters to view invoice history
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              Preview of the tax invoice before generation
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 border rounded-md bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Property Tax Invoice</h2>
                <p className="text-gray-600">
                  Lagos State Property Tax Authority
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  Invoice #: {invoicePreview.invoiceNumber}
                </p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Due Date: {invoicePreview.dueDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
                <p className="font-medium">{invoicePreview.owner}</p>
                <p>{invoicePreview.address}</p>
                <p>Property ID: {invoicePreview.propertyId}</p>
                <p>Property Type: {invoicePreview.propertyType}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Payment Details:
                </h3>
                <p>Bank: Lagos State Revenue Bank</p>
                <p>Account: 1234567890</p>
                <p>Reference: {invoicePreview.invoiceNumber}</p>
              </div>
            </div>

            <div className="mt-8">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left border-b">
                      Description
                    </th>
                    <th className="py-2 px-4 text-right border-b">
                      Assessed Value
                    </th>
                    <th className="py-2 px-4 text-right border-b">Rate</th>
                    <th className="py-2 px-4 text-right border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b">
                      Annual Property Tax (2023)
                    </td>
                    <td className="py-3 px-4 text-right border-b">
                      {formatCurrency(invoicePreview.assessedValue)}
                    </td>
                    <td className="py-3 px-4 text-right border-b">
                      {(invoicePreview.taxRate * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right border-b font-medium">
                      {formatCurrency(invoicePreview.taxAmount)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td
                      colSpan={3}
                      className="py-3 px-4 text-right font-semibold"
                    >
                      Total Due:
                    </td>
                    <td className="py-3 px-4 text-right font-bold">
                      {formatCurrency(invoicePreview.taxAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-2">
                Payment Options:
              </h3>
              <ul className="list-disc pl-5">
                {invoicePreview.paymentOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm">{invoicePreview.notes}</p>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email to Owner
              </Button>
              <Button size="sm" onClick={() => setShowPreview(false)}>
                Generate Final Invoice
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
