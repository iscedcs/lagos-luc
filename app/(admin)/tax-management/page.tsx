import type { Metadata } from "next"
import TaxCollectionChart from "./tax-collection-chart"
import TaxDefaultersTable from "./tax-defaulters-table"
import TaxRatesTable from "./tax-rates-table"
import TaxInvoiceGenerator from "./tax-invoice-generator"

export const metadata: Metadata = {
  title: "Tax Management | Lagos Property Tax Administration",
  description: "Manage property tax rates, generate invoices, and track tax collection",
}

export default function TaxManagementPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Tax Management</h1>
          <p className="text-muted-foreground">Manage tax rates, generate invoices, and track tax collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaxCollectionChart />
        <TaxDefaultersTable />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxRatesTable />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxInvoiceGenerator />
      </div>
    </div>
  )
}

