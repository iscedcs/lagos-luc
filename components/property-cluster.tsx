"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { Property } from "@/lib/types";

interface PropertyClusterProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

export function PropertyCluster({
  properties,
  onPropertyClick,
}: PropertyClusterProps) {
  const map = useMap();
  const markersRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!map || properties.length === 0 || initializedRef.current) return;

    // Set initialized to true to prevent multiple initializations
    initializedRef.current = true;

    // Import Leaflet only on the client side
    const initializeCluster = async () => {
      try {
        // Dynamically import Leaflet
        const L = (await import("leaflet")).default;

        // Create circle markers for each property
        properties.forEach((property) => {
          const marker = L.circleMarker(property.center, {
            radius: 8,
            fillColor:
              property.paymentStatus === "paid" ? "#10b981" : "#ef4444",
            color: property.paymentStatus === "paid" ? "#10b981" : "#ef4444",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(map);

          // Add tooltip
          marker.bindTooltip(
            `
            <div class="text-sm">
              <p class="font-semibold">${property.address}</p>
              <p>Owner: ${property.owner}</p>
              <p>Status: ${
                property.paymentStatus === "paid" ? "Cleared" : "Owing"
              }</p>
            </div>
          `,
            {
              direction: "top",
            }
          );

          // Add click handler
          marker.on("click", () => {
            onPropertyClick(property);
          });
        });
      } catch (error) {
        console.error("Error initializing property markers:", error);
      }
    };

    // Initialize the markers
    initializeCluster();

    // Clean up on unmount
    return () => {
      // Cleanup will be handled by Leaflet when the map is destroyed
    };
  }, [map, properties, onPropertyClick]);

  return null;
}
