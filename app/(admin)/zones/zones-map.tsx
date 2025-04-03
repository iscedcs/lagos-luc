"use client";

import { useEffect, useRef, useState } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

// Mock data for zone boundaries
const MOCK_ZONE_DATA = [
  {
    id: 1,
    name: "Ikoyi",
    color: "#FF5733",
    center: { lat: 6.455, lng: 3.4345 },
    // In a real app, you would have polygon coordinates for the zone boundaries
  },
  {
    id: 2,
    name: "Victoria Island",
    color: "#33FF57",
    center: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 3,
    name: "Lekki Phase 1",
    color: "#3357FF",
    center: { lat: 6.4698, lng: 3.5652 },
  },
  {
    id: 4,
    name: "Ikeja",
    color: "#F3FF33",
    center: { lat: 6.6018, lng: 3.3515 },
  },
  {
    id: 5,
    name: "Surulere",
    color: "#FF33F6",
    center: { lat: 6.5059, lng: 3.3509 },
  },
  {
    id: 6,
    name: "Yaba",
    color: "#33FFF6",
    center: { lat: 6.5165, lng: 3.3838 },
  },
];

// In a real application, you would use actual polygon data for zone boundaries
function ZoneMarkers() {
  // @ts-expect-error: expected to be a google map instance
  const { map } = useMap();
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any | null>(null);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear any existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Create info window
    infoWindowRef.current = new window.google.maps.InfoWindow();

    // Create markers for each zone
    MOCK_ZONE_DATA.forEach((zone) => {
      const marker = new window.google.maps.Marker({
        position: zone.center,
        map,
        title: zone.name,
        label: {
          text: zone.name,
          color: "#FFFFFF",
          fontSize: "12px",
          fontWeight: "bold",
        },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: zone.color,
          fillOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: "#FFFFFF",
          scale: 20,
        },
      });

      // Add click listener
      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(`
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${zone.name}</h3>
              <p style="margin: 0;">Zone ID: ${zone.id}</p>
              <p style="margin: 4px 0 0 0;">Click for more details</p>
            </div>
          `);
          infoWindowRef.current.open(map, marker);
        }
      });

      markersRef.current.push(marker);
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [map]);

  return null;
}

export default function ZonesMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos center

  return (
    <div className="w-full h-full rounded-md overflow-hidden">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          mapId="lagos-zones-map"
          defaultCenter={mapCenter}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI={false}
          // @ts-expect-error: expected to be a google map instance
          onLoad={() => setMapLoaded(true)}
          mapTypeId="roadmap"
          mapTypeControl={true}
          style={{ width: "100%", height: "100%" }}
        >
          {mapLoaded && <ZoneMarkers />}
        </Map>
      </APIProvider>
    </div>
  );
}
