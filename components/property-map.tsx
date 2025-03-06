"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { fetchProperties } from "@/lib/api";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Search, ZoomIn, ZoomOut, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PropertyDetails } from "@/components/property-details";
import { PropertyList } from "@/components/property-list";
import { ViewToggle } from "@/components/view-toggle";
import MapComponent from "./map-component";

export default function PropertyMap() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [center, setCenter] = useState<[number, number]>([6.5244, 3.3792]); // Lagos coordinates
  const [zoom, setZoom] = useState(11); // Lower zoom level to show more of Lagos
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [view, setView] = useState<"map" | "list" | "split">("map");

  // Debounce search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial properties
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Handle property selection
  const handlePropertyClick = useCallback(
    (property: Property) => {
      setSelectedProperty(property);
      setCenter(property.center);

      // If in list view, switch to split view to show the property on the map
      if (view === "list") {
        setView("split");
      }
    },
    [view]
  );

  // Handle search input change with debounce
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set searching state
    setIsSearching(true);

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await fetchProperties(query);
        setProperties(results);

        // If we have results and the first result has coordinates, center the map on it
        if (results.length > 0) {
          setCenter(results[0].center);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any pending debounced search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Immediately perform the search
    const performSearch = async () => {
      setIsSearching(true);
      try {
        const results = await fetchProperties(searchQuery);
        setProperties(results);

        // If we have results, center the map on the first result
        if (results.length > 0) {
          setCenter(results[0].center);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  };

  // Map control handlers
  const handleZoomIn = useCallback(() => {
    if (map) {
      try {
        map.zoomIn();
      } catch (error) {
        console.error("Error zooming in:", error);
      }
    }
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) {
      try {
        map.zoomOut();
      } catch (error) {
        console.error("Error zooming out:", error);
      }
    }
  }, [map]);

  const handleResetView = useCallback(() => {
    setCenter([6.5244, 3.3792]);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex-1 h-full flex flex-col">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">
              Loading property data...
            </p>
          </div>
        </div>
      ) : null}

      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Search by address, owner, or ID..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-white/90 shadow-md"
          />
          <Button type="submit" variant="default" disabled={isSearching}>
            {isSearching ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search
          </Button>
        </form>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view !== "list" && (
        <div className="absolute right-4 bottom-20 z-10 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 shadow-md"
            onClick={handleResetView}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      )}

      {selectedProperty && view !== "list" && (
        <div className="absolute right-4 top-16 z-10 w-80">
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        </div>
      )}

      <div className="flex-1 flex mt-16">
        {view === "map" && (
          <div className="flex-1 relative">
            <MapComponent
              center={center}
              zoom={zoom}
              properties={properties}
              onPropertyClick={handlePropertyClick}
              setMap={setMap}
            />
          </div>
        )}

        {view === "list" && (
          <div className="flex-1 bg-background">
            <PropertyList
              properties={properties}
              onPropertySelect={handlePropertyClick}
              selectedProperty={selectedProperty}
              onSearch={handleSearchChange}
              searchQuery={searchQuery}
              isSearching={isSearching}
            />
          </div>
        )}

        {view === "split" && (
          <>
            <div className="w-1/2 relative border-r">
              <MapComponent
                center={center}
                zoom={zoom}
                properties={properties}
                onPropertyClick={handlePropertyClick}
                setMap={setMap}
              />
            </div>
            <div className="w-1/2 bg-background">
              <PropertyList
                properties={properties}
                onPropertySelect={handlePropertyClick}
                selectedProperty={selectedProperty}
                onSearch={handleSearchChange}
                searchQuery={searchQuery}
                isSearching={isSearching}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
