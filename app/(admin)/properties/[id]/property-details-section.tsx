import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PropertyDetailsSectionProps {
  property: any
}

export default function PropertyDetailsSection({ property }: PropertyDetailsSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Property ID</p>
            <p className="text-base font-semibold">{property.propertyId}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
            <p className="text-base font-semibold">{new Date(property.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Property Type</p>
          <p className="text-base font-semibold">{property.type}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Property Use</p>
          <p className="text-base font-semibold">{property.use}</p>
        </div>

        {property.type === "Building" || property.type === "Mixed-use" ? (
          <>
            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Building Type</p>
                <p className="text-base font-semibold">{property.buildingType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Year Built</p>
                <p className="text-base font-semibold">{property.yearOfConstruction}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Number of Floors</p>
                <p className="text-base font-semibold">{property.numberOfFloors}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Number of Units</p>
                <p className="text-base font-semibold">{property.numberOfUnits}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Covered Area</p>
                <p className="text-base font-semibold">{property.totalCoveredArea} sqm</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Building Condition</p>
                <p className="text-base font-semibold">{property.buildingCondition}</p>
              </div>
            </div>
          </>
        ) : null}

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <p className="text-base font-semibold capitalize">{property.status}</p>
        </div>

        {property.status === "verified" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Verification Date</p>
              <p className="text-base font-semibold">{new Date(property.verificationDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Verified By</p>
              <p className="text-base font-semibold">{property.verifiedBy}</p>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
          <p className="text-base font-semibold">{new Date(property.lastUpdated).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

