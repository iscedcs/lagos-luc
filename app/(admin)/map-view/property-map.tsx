"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { Map, useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import PropertyMarker from "./property-marker";
import { Skeleton } from "@/components/ui/skeleton";

// Define the google type for TypeScript
declare global {
  interface Window {
    google: any;
  }
}

interface PropertyMapProps {
  properties: any[];
  isLoading: boolean;
  onPropertySelect: (property: any) => void;
  userLocation: { lat: number; lng: number } | null;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}

export default function PropertyMap({
  properties,
  isLoading,
  onPropertySelect,
  userLocation,
  mapRef,
}: PropertyMapProps) {
  // Default center on Lagos
  const defaultCenter = { lat: 6.5244, lng: 3.3792 };
  const defaultZoom = 12;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 h-full">
        <div className="text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        mapId="lagos-property-map"
        gestureHandling="greedy"
        disableDefaultUI={false}
        streetViewControl={true}
        fullscreenControl={true}
        zoomControl={true}
        mapTypeControl={true}
        mapTypeControlOptions={{
          position: 3, // TOP_RIGHT
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapContent
          properties={properties}
          onPropertySelect={onPropertySelect}
          userLocation={userLocation}
        />
      </Map>
    </div>
  );
}

function MapContent({
  properties,
  onPropertySelect,
  userLocation,
}: {
  properties: any[];
  onPropertySelect: (property: any) => void;
  userLocation: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(12);

  // Update zoom level when map changes
  useEffect(() => {
    if (!map || !window.google) return;

    const listener = window.google.maps.event.addListener(
      map,
      "zoom_changed",
      () => {
        setZoom(map.getZoom() || 12);
      }
    );

    return () => {
      if (window.google && listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [map]);

  // Simple clustering implementation
  const clusters = useMemo(() => {
    if (!map) return [];

    // If zoomed in enough, don't cluster
    if (zoom >= 15) {
      return properties.map((property) => ({
        id: property.id,
        position: property.coordinates,
        isCluster: false,
        property,
      }));
    }

    // Simple grid-based clustering
    const gridSize =
      zoom < 10 ? 0.1 : zoom < 12 ? 0.05 : zoom < 14 ? 0.02 : 0.01;
    const clusters: Record<string, any> = {};

    properties.forEach((property) => {
      // Create a grid cell key based on rounded coordinates
      const lat = Math.round(property.coordinates.lat / gridSize) * gridSize;
      const lng = Math.round(property.coordinates.lng / gridSize) * gridSize;
      const key = `${lat}-${lng}`;

      if (!clusters[key]) {
        clusters[key] = {
          id: key,
          position: { lat, lng },
          properties: [property],
          isCluster: false,
        };
      } else {
        clusters[key].properties.push(property);
        if (clusters[key].properties.length === 2) {
          clusters[key].isCluster = true;
        }
      }
    });

    // Convert to array and add count
    return Object.values(clusters).map((cluster) => ({
      ...cluster,
      count: cluster.properties.length,
      // If it's not a cluster, include the property directly
      property: cluster.isCluster ? null : cluster.properties[0],
    }));
  }, [properties, map, zoom]);

  // Handle marker click
  const handleMarkerClick = (cluster: any) => {
    if (!map) return;

    // If it's a cluster, zoom in
    if (cluster.isCluster) {
      map.setCenter(cluster.position);
      map.setZoom((map.getZoom() || 12) + 2);
      return;
    }

    // If it's a single property, select it
    if (cluster.property) {
      onPropertySelect(cluster.property);
    }
  };

  // User location marker
  const userLocationMarker = userLocation ? (
    <AdvancedMarker position={userLocation}>
      <div className="relative">
        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>
    </AdvancedMarker>
  ) : null;

  return (
    <>
      {clusters.map((cluster) => (
        <PropertyMarker
          key={cluster.id}
          cluster={cluster}
          onClick={() => handleMarkerClick(cluster)}
        />
      ))}

      {userLocationMarker}
    </>
  );
}
