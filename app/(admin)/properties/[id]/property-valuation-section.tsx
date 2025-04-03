import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PropertyValuationSectionProps {
  property: any
}

export default function PropertyValuationSection({ property }: PropertyValuationSectionProps) {
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
      <CardHeader className="pb-2">
        <CardTitle>Valuation & Charges</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Property Value</p>
            <p className="text-base font-semibold">{formatCurrency(property.value)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Annual Land Use Charge</p>
            <p className="text-base font-semibold">{formatCurrency(property.luc)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
            <Badge
              className={
                property.paymentStatus === "paid"
                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  : property.paymentStatus === "partial"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
              }
            >
              {property.paymentStatus.charAt(0).toUpperCase() + property.paymentStatus.slice(1)}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Next Payment Due</p>
            <p className="text-base font-semibold">{new Date(property.paymentDue).toLocaleDateString()}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Valuation Parameters</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Location Class</p>
            <p className="text-base font-semibold">{property.locationClass}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Location Weight</p>
            <p className="text-base font-semibold">{property.locationWeight.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Use Weight</p>
            <p className="text-base font-semibold">{property.useWeight.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Type Weight</p>
            <p className="text-base font-semibold">{property.typeWeight.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Building Factor</p>
            <p className="text-base font-semibold">{property.buildingFactor.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Area Factor</p>
            <p className="text-base font-semibold">{property.areaFactor.toFixed(2)}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Calculation</p>
          <p className="text-xs text-muted-foreground mt-1">
            Property Value = Area × Base Rate × Location Weight × Use Weight × Type Weight × Area Factor × Building
            Factor
          </p>
          <p className="text-xs text-muted-foreground mt-1">Land Use Charge = Property Value × 0.005 (0.5%)</p>
        </div>
      </CardContent>
    </Card>
  )
}

