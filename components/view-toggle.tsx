"use client";

import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";

interface ViewToggleProps {
  view: "map" | "list" | "split";
  onChange: (view: "map" | "list" | "split") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-background border rounded-md p-1">
      <Button
        variant={view === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("map")}
        className="gap-1"
      >
        <Map className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:inline-block">Map</span>
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="gap-1"
      >
        <List className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:inline-block">List</span>
      </Button>
      <Button
        variant={view === "split" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("split")}
        className="gap-1"
      >
        <div className="flex h-4 w-4 items-center justify-center">
          <div className="h-4 w-2 border-r border-current"></div>
          <div className="h-4 w-2"></div>
        </div>
        <span className="sr-only sm:not-sr-only sm:inline-block">Split</span>
      </Button>
    </div>
  );
}
