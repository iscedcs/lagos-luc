import type { Metadata } from "next"
import MapViewContainer from "./map-view-container"

export const metadata: Metadata = {
  title: "Property Map | Lagos Property Map",
  description: "Interactive map view of all properties in the Lagos Property Map system",
}

export default function MapViewPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <MapViewContainer />
    </div>
  )
}

