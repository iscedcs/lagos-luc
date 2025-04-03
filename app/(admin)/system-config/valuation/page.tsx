import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ValuationFormulas from "./valuation-formulas"
import PropertyTypeRates from "./property-type-rates"
import ZoneMultipliers from "./zone-multipliers"

export const metadata = {
  title: "Valuation Parameters | Lagos Property Map",
  description: "Configure property valuation parameters and formulas",
}

export default function ValuationParametersPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Valuation Parameters</h1>
        <p className="text-muted-foreground mt-2">Configure property valuation formulas, rates, and multipliers</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Valuation Formulas</CardTitle>
            <CardDescription>Define the mathematical formulas used to calculate property values</CardDescription>
          </CardHeader>
          <CardContent>
            <ValuationFormulas />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Type Rates</CardTitle>
            <CardDescription>Set base rates for different property types and classifications</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyTypeRates />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zone Multipliers</CardTitle>
            <CardDescription>Configure multipliers for different zones and locations</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoneMultipliers />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

