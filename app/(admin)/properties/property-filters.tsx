"use client"

import { useState } from "react"
import { Check, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Define filter options
const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Pending", value: "pending" },
  { label: "Disputed", value: "disputed" },
]

const zoneOptions = [
  { label: "All Zones", value: "all" },
  { label: "Lagos Island", value: "lagos-island" },
  { label: "Ikeja", value: "ikeja" },
  { label: "Lekki", value: "lekki" },
  { label: "Surulere", value: "surulere" },
  { label: "Ikorodu", value: "ikorodu" },
  { label: "Badagry", value: "badagry" },
]

const typeOptions = [
  { label: "All Types", value: "all" },
  { label: "Land", value: "land" },
  { label: "Building", value: "building" },
  { label: "Mixed-use", value: "mixed-use" },
]

const paymentOptions = [
  { label: "All Payment Statuses", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Partial", value: "partial" },
]

type Option = {
  label: string
  value: string
}

export default function PropertyFilters() {
  const [status, setStatus] = useState<Option>(statusOptions[0])
  const [zone, setZone] = useState<Option>(zoneOptions[0])
  const [type, setType] = useState<Option>(typeOptions[0])
  const [payment, setPayment] = useState<Option>(paymentOptions[0])
  const [open, setOpen] = useState(false)

  const isFiltered = status.value !== "all" || zone.value !== "all" || type.value !== "all" || payment.value !== "all"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
          {isFiltered && (
            <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-800">Active</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search filters..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Status">
              {statusOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setStatus(option)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", status.value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Zone">
              {zoneOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setZone(option)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", zone.value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Property Type">
              {typeOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setType(option)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", type.value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Payment Status">
              {paymentOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setPayment(option)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", payment.value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <div className="flex items-center justify-between p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatus(statusOptions[0])
                setZone(zoneOptions[0])
                setType(typeOptions[0])
                setPayment(paymentOptions[0])
              }}
              className={cn(!isFiltered && "opacity-50")}
              disabled={!isFiltered}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

