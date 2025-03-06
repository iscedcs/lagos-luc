"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/lib/types";
import { PropertyCluster } from "@/components/property-cluster";

// This component handles map recenter operations
function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
    map.invalidateSize();
  }, [center, zoom, map]);

  return null;
}

interface MapContentProps {
  center: [number, number];
  zoom: number;
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  setMap: (map: any) => void;
}

export default function MapContent({
  center,
  zoom,
  properties,
  onPropertyClick,
  setMap,
}: MapContentProps) {
  const mapRef = useRef<any>(null);

  // Use a ref to track if the map has been initialized
  const mapInitializedRef = useRef(false);

  useEffect(() => {
    // Only set the map once
    if (mapRef.current && !mapInitializedRef.current) {
      setMap(mapRef.current);
      mapInitializedRef.current = true;
    }
  }, [setMap]);

  // Add an effect to handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial invalidateSize after a short delay to ensure the container is fully rendered
    const timer = setTimeout(() => {
      handleResize();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      className="z-0"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} zoom={zoom} />

      {properties.map((property) => (
        <Polygon
          key={property.id}
          positions={property.boundaries}
          pathOptions={{
            color: property.paymentStatus === "paid" ? "#10b981" : "#ef4444",
            fillColor:
              property.paymentStatus === "paid" ? "#10b981" : "#ef4444",
            fillOpacity: 0.5,
            weight: 2,
          }}
          eventHandlers={{
            click: () => onPropertyClick(property),
          }}
        >
          <Tooltip sticky>
            <div className="text-sm">
              <p className="font-semibold">{property.address}</p>
              <p>Owner: {property.owner}</p>
              <p>
                Status:{" "}
                {property.paymentStatus === "paid" ? "Cleared" : "Owing"}
              </p>
            </div>
          </Tooltip>
        </Polygon>
      ))}

      <PropertyCluster
        properties={properties}
        onPropertyClick={onPropertyClick}
      />
    </MapContainer>
  );
}
