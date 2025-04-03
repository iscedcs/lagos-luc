"use client"

import { useState, useEffect } from "react"
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, MapPin, Navigation } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ViewMapModalProps {
  isOpen: boolean
  onClose: () => void
  property: any
}

export default function ViewMapModal({ isOpen, onClose, property }: ViewMapModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCopyCoordinates = () => {
    const coordinates = `${property.gpsCoordinates.latitude.toFixed(6)}, ${property.gpsCoordinates.longitude.toFixed(6)}`
    navigator.clipboard.writeText(coordinates)
    toast({
      title: "Coordinates copied",
      description: "GPS coordinates have been copied to clipboard",
    })
  }

  const handleOpenInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${property.gpsCoordinates.latitude},${property.gpsCoordinates.longitude}`
    window.open(url, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Property Location</DialogTitle>
          <DialogDescription>{property.address}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 p-2 bg-muted rounded-md text-sm">
            <span className="font-medium">GPS: </span>
            {property.gpsCoordinates.latitude.toFixed(6)}, {property.gpsCoordinates.longitude.toFixed(6)}
          </div>
          <Button variant="outline" size="sm" onClick={handleCopyCoordinates}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleOpenInGoogleMaps}>
            <Navigation className="h-4 w-4 mr-2" />
            Open in Google Maps
          </Button>
        </div>

        <div className="flex-1 min-h-[400px] w-full rounded-md overflow-hidden">
          {isMounted && (
            <APIProvider apiKey={apiKey}>
              <Map
                mapId="property-location-map-fullscreen"
                defaultCenter={{
                  lat: property.gpsCoordinates.latitude,
                  lng: property.gpsCoordinates.longitude,
                }}
                defaultZoom={16}
                gestureHandling="greedy"
                mapTypeControl={true}
                streetViewControl={true}
                fullscreenControl={true}
                style={{ width: "100%", height: "100%" }}
              >
                <AdvancedMarker
                  position={{
                    lat: property.gpsCoordinates.latitude,
                    lng: property.gpsCoordinates.longitude,
                  }}
                  onClick={() => setShowInfoWindow(!showInfoWindow)}
                >
                  <div className="bg-emerald-600 text-white p-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                </AdvancedMarker>

                {showInfoWindow && (
                  <InfoWindow
                    position={{
                      lat: property.gpsCoordinates.latitude,
                      lng: property.gpsCoordinates.longitude,
                    }}
                    onCloseClick={() => setShowInfoWindow(false)}
                  >
                    <div className="p-2 max-w-[200px]">
                      <h3 className="font-bold text-sm">{property.propertyId}</h3>
                      <p className="text-xs mt-1">{property.address}</p>
                      <p className="text-xs mt-1">
                        {property.type} - {property.use}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

