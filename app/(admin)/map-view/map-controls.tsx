"use client"

import { Compass, Plus, RotateCw, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MapControlsProps {
  onLocateMe: () => void
  onAddProperty: () => void
  onRefresh: () => void
  onExport: () => void
  isAdmin: boolean
}

export default function MapControls({ onLocateMe, onAddProperty, onRefresh, onExport, isAdmin }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-100"
              onClick={onLocateMe}
            >
              <Compass className="h-5 w-5" />
              <span className="sr-only">Locate Me</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Locate Me</p>
          </TooltipContent>
        </Tooltip>

        {isAdmin && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white shadow-md hover:bg-gray-100"
                onClick={onAddProperty}
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add New Property</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Add New Property</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-100"
              onClick={onRefresh}
            >
              <RotateCw className="h-5 w-5" />
              <span className="sr-only">Refresh Layer</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Refresh Layer</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" className="bg-white shadow-md hover:bg-gray-100" onClick={onExport}>
              <FileDown className="h-5 w-5" />
              <span className="sr-only">Export Map</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Export Map</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

