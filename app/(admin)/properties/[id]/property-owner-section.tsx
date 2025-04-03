import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PropertyOwnerSectionProps {
  property: any
}

export default function PropertyOwnerSection({ property }: PropertyOwnerSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Owner Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Owner Name</p>
          <p className="text-base font-semibold">{property.ownerName}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Owner Type</p>
          <p className="text-base font-semibold">{property.ownerType}</p>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
          <p className="text-base font-semibold">{property.ownerContact.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Contact Phone</p>
          <p className="text-base font-semibold">{property.ownerContact.phone}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Contact Address</p>
          <p className="text-base font-semibold">{property.ownerContact.address}</p>
        </div>

        {property.ownerType === "Corporate" && property.ownerRepresentative && (
          <>
            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground">Representative Name</p>
              <p className="text-base font-semibold">{property.ownerRepresentative.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Representative Position</p>
              <p className="text-base font-semibold">{property.ownerRepresentative.position}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Representative Email</p>
                <p className="text-base font-semibold">{property.ownerRepresentative.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Representative Phone</p>
                <p className="text-base font-semibold">{property.ownerRepresentative.phone}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

