"use client"

import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { Building, Home, Archive, AlertCircle } from "lucide-react"

interface PropertyMarkerProps {
  cluster: any
  onClick: () => void
}

export default function PropertyMarker({ cluster, onClick }: PropertyMarkerProps) {
  // If it's a cluster, render a cluster marker
  if (cluster.isCluster) {
    return (
      <AdvancedMarker position={cluster.position} onClick={onClick}>
        <div className="bg-white rounded-full border border-gray-300 shadow-lg p-2 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow">
          <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {cluster.count}
          </div>
        </div>
      </AdvancedMarker>
    )
  }

  // If it's a single property, render a property marker
  const property = cluster.property

  // Determine marker color based on compliance status
  const getMarkerColor = () => {
    switch (property.complianceStatus) {
      case "compliant":
        return "bg-emerald-600"
      case "partial":
        return "bg-amber-500"
      case "defaulting":
        return "bg-red-600"
      default:
        return "bg-gray-500"
    }
  }

  // Determine marker icon based on property type
  const getMarkerIcon = () => {
    switch (property.type) {
      case "Building":
        return <Building className="h-4 w-4 text-white" />
      case "Land":
        return <Home className="h-4 w-4 text-white" />
      case "Mixed-use":
        return <Archive className="h-4 w-4 text-white" />
      default:
        return <AlertCircle className="h-4 w-4 text-white" />
    }
  }

  return (
    <AdvancedMarker position={property.coordinates} onClick={onClick}>
      <div className={`${getMarkerColor()} rounded-lg shadow-lg p-2 cursor-pointer hover:shadow-xl transition-shadow`}>
        {getMarkerIcon()}
      </div>
    </AdvancedMarker>
  )
}

