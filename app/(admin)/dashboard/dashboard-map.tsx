"use client"

import { useEffect, useState } from "react"
import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps"

// Mock data for property clusters
const propertyClusters = [
  { lat: 6.455, lng: 3.3841, count: 1245, type: "residential" }, // Lagos Island
  { lat: 6.6018, lng: 3.3515, count: 854, type: "mixed" }, // Ikeja
  { lat: 6.4698, lng: 3.5852, count: 932, type: "residential" }, // Lekki
  { lat: 6.5059, lng: 3.3565, count: 621, type: "commercial" }, // Surulere
  { lat: 6.6194, lng: 3.5105, count: 412, type: "industrial" }, // Ikorodu
  { lat: 6.4315, lng: 2.8876, count: 245, type: "residential" }, // Badagry
]

// Custom marker component
function PropertyClusterMarker({ lat, lng, count, type }: { lat: number; lng: number; count: number; type: string }) {
  let bgColor = "bg-emerald-500"
  if (type === "commercial") bgColor = "bg-blue-500"
  if (type === "industrial") bgColor = "bg-purple-500"
  if (type === "mixed") bgColor = "bg-amber-500"

  return (
    <AdvancedMarker position={{ lat, lng }}>
      <div
        className={`${bgColor} text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold`}
      >
        {count}
      </div>
    </AdvancedMarker>
  )
}

function MapContent() {
  const map = useMap()

  useEffect(() => {
    if (map) {
      // Center the map on Lagos
      map.setCenter({ lat: 6.5244, lng: 3.3792 })
      map.setZoom(11)
    }
  }, [map])

  return (
    <>
      {propertyClusters.map((cluster, index) => (
        <PropertyClusterMarker
          key={index}
          lat={cluster.lat}
          lng={cluster.lng}
          count={cluster.count}
          type={cluster.type}
        />
      ))}
    </>
  )
}

export default function DashboardMap() {
  const [isMounted, setIsMounted] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-full flex items-center justify-center">Loading map...</div>
  }

  return (
    <div className="h-full w-full rounded-md overflow-hidden">
      <APIProvider apiKey={apiKey}>
        <Map mapId="lagos-property-map" style={{ width: "100%", height: "100%" }}>
          <MapContent />
        </Map>
      </APIProvider>
    </div>
  )
}

