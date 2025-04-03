"use client"

import { Flag, UserCheck, History, Printer, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdminActionBarProps {
  selectedProperty: any | null
}

export default function AdminActionBar({ selectedProperty }: AdminActionBarProps) {
  // If no property is selected, don't render the action bar
  if (!selectedProperty) {
    return null
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Flag className="h-5 w-5" />
                <span className="sr-only">Flag Property</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Flag Property</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCheck className="h-5 w-5" />
                <span className="sr-only">Assign Agent</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Assign Agent</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <History className="h-5 w-5" />
                <span className="sr-only">View History</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View History</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Printer className="h-5 w-5" />
                <span className="sr-only">Print</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Navigation className="h-5 w-5" />
                <span className="sr-only">Navigate</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Navigate</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

