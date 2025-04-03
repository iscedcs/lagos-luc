"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Expand } from "lucide-react"
import ViewMapModal from "./view-map-modal"

interface PropertyLocationSectionProps {
  property: any
}

export default function PropertyLocationSection({ property }: PropertyLocationSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle>Location Information</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowMapModal(true)}>
            <Expand className="h-4 w-4 mr-2" />
            View Map
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-base font-semibold">{property.address}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">LGA</p>
              <p className="text-base font-semibold">{property.lga}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">LCDA</p>
              <p className="text-base font-semibold">{property.lcda}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ward</p>
              <p className="text-base font-semibold">{property.ward}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Zone</p>
            <p className="text-base font-semibold">{property.zone}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Latitude</p>
              <p className="text-base font-semibold">{property.gpsCoordinates.latitude.toFixed(6)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Longitude</p>
              <p className="text-base font-semibold">{property.gpsCoordinates.longitude.toFixed(6)}</p>
            </div>
          </div>

          <Separator />

          <div className="h-[200px] w-full rounded-md overflow-hidden">
            {isMounted && (
              <APIProvider apiKey={apiKey}>
                <Map
                  mapId="property-location-map"
                  defaultCenter={{
                    lat: property.gpsCoordinates.latitude,
                    lng: property.gpsCoordinates.longitude,
                  }}
                  defaultZoom={15}
                  gestureHandling="greedy"
                  disableDefaultUI={true}
                  style={{ width: "100%", height: "100%" }}
                >
                  <AdvancedMarker
                    position={{
                      lat: property.gpsCoordinates.latitude,
                      lng: property.gpsCoordinates.longitude,
                    }}
                  />
                </Map>
              </APIProvider>
            )}
          </div>
        </CardContent>
      </Card>

      <ViewMapModal isOpen={showMapModal} onClose={() => setShowMapModal(false)} property={property} />
    </>
  )
}

