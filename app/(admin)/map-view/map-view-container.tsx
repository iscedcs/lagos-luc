"use client"

import { useState, useEffect, useRef } from "react"
import { APIProvider } from "@vis.gl/react-google-maps"
import PropertyMap from "./property-map"
import MapControls from "./map-controls"
import PropertyPanel from "./property-panel"
import AdminActionBar from "./admin-action-bar"
import { useToast } from "@/components/ui/use-toast"
import { generateMockProperties } from "./mock-data"

export default function MapViewContainer() {
  const [properties, setProperties] = useState<any[]>([])
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true
  const mapRef = useRef<any>(null)
  const { toast } = useToast()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  // Load properties data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        // For demo, we'll use mock data
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

        const mockProperties = generateMockProperties(500)
        setProperties(mockProperties)
      } catch (error) {
        console.error("Error fetching properties:", error)
        toast({
          title: "Error",
          description: "Failed to load property data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [toast])

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          // Center map on user location if map reference exists
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude })
            mapRef.current.setZoom(15)
          }

          toast({
            title: "Location found",
            description: "Map centered on your current location",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location error",
            description: "Unable to get your current location. Please check your browser permissions.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })
    }
  }

  // Handle property selection
  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property)
  }

  // Handle property panel close
  const handleClosePanel = () => {
    setSelectedProperty(null)
  }

  // Handle refresh data
  const handleRefreshData = async () => {
    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

      const mockProperties = generateMockProperties(500)
      setProperties(mockProperties)

      toast({
        title: "Data refreshed",
        description: "Property data has been updated",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Refresh error",
        description: "Failed to refresh property data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle export map
  const handleExportMap = () => {
    toast({
      title: "Export initiated",
      description: "Preparing map export as PDF...",
    })

    // In a real app, this would trigger a PDF export
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Map has been exported as PDF",
      })
    }, 2000)
  }

  // Handle add new property
  const handleAddProperty = () => {
    // In a real app, this would navigate to the property registration page
    // or open a modal for quick property addition
    window.location.href = "/register-property"
  }

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-64px)]">
      <APIProvider apiKey={apiKey}>
        <div className="absolute inset-0">
          <PropertyMap
            properties={properties}
            isLoading={isLoading}
            onPropertySelect={handlePropertySelect}
            userLocation={userLocation}
            mapRef={mapRef}
          />
        </div>

        <MapControls
          onLocateMe={getUserLocation}
          onAddProperty={handleAddProperty}
          onRefresh={handleRefreshData}
          onExport={handleExportMap}
          isAdmin={isAdmin}
        />

        {selectedProperty && <PropertyPanel property={selectedProperty} onClose={handleClosePanel} />}

        {isAdmin && <AdminActionBar selectedProperty={selectedProperty} />}
      </APIProvider>
    </div>
  )
}

