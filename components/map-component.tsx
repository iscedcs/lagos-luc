"use client";

import { useEffect, useState } from "react";
import type { Property } from "@/lib/types";
import MapContent from "./map-content";

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  setMap: (map: any) => void;
}

export default function MapComponent({
  center,
  zoom,
  properties,
  onPropertyClick,
  setMap,
}: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContent
      center={center}
      zoom={zoom}
      properties={properties}
      onPropertyClick={onPropertyClick}
      setMap={setMap}
    />
  );
}
