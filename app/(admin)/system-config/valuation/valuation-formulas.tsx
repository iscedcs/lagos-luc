"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ValuationFormulas() {
  const [activeState, setActiveState] = useState("lagos")
  const [residentialFormula, setResidentialFormula] = useState(
    "(BASE_RATE * AREA) * ZONE_MULTIPLIER * CONDITION_FACTOR * AGE_FACTOR",
  )
  const [commercialFormula, setCommercialFormula] = useState(
    "(BASE_RATE * AREA) * ZONE_MULTIPLIER * USAGE_FACTOR * FLOOR_FACTOR",
  )
  const [industrialFormula, setIndustrialFormula] = useState(
    "(BASE_RATE * AREA) * ZONE_MULTIPLIER * INDUSTRY_TYPE_FACTOR",
  )

  const handleSave = () => {
    // Save valuation formulas
    console.log({
      state: activeState,
      residentialFormula,
      commercialFormula,
      industrialFormula,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Label htmlFor="state-select">Active State/Region:</Label>
        <Select value={activeState} onValueChange={setActiveState}>
          <SelectTrigger id="state-select" className="w-[180px]">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lagos">Lagos</SelectItem>
            <SelectItem value="abuja">Abuja</SelectItem>
            <SelectItem value="kano">Kano</SelectItem>
            <SelectItem value="rivers">Rivers</SelectItem>
            <SelectItem value="oyo">Oyo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="industrial">Industrial</TabsTrigger>
        </TabsList>

        <TabsContent value="residential" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="residential-formula">Residential Property Formula</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      Available variables: BASE_RATE, AREA, ZONE_MULTIPLIER, CONDITION_FACTOR, AGE_FACTOR,
                      AMENITIES_FACTOR
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              id="residential-formula"
              value={residentialFormula}
              onChange={(e) => setResidentialFormula(e.target.value)}
              rows={3}
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition-factor">Condition Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="condition-min" type="number" placeholder="Min" defaultValue={0.7} className="w-24" />
                <span>to</span>
                <Input id="condition-max" type="number" placeholder="Max" defaultValue={1.3} className="w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-factor">Age Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="age-min" type="number" placeholder="Min" defaultValue={0.6} className="w-24" />
                <span>to</span>
                <Input id="age-max" type="number" placeholder="Max" defaultValue={1.0} className="w-24" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commercial" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="commercial-formula">Commercial Property Formula</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      Available variables: BASE_RATE, AREA, ZONE_MULTIPLIER, USAGE_FACTOR, FLOOR_FACTOR, FRONTAGE_FACTOR
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              id="commercial-formula"
              value={commercialFormula}
              onChange={(e) => setCommercialFormula(e.target.value)}
              rows={3}
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usage-factor">Usage Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="usage-min" type="number" placeholder="Min" defaultValue={0.8} className="w-24" />
                <span>to</span>
                <Input id="usage-max" type="number" placeholder="Max" defaultValue={1.5} className="w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor-factor">Floor Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="floor-min" type="number" placeholder="Min" defaultValue={0.9} className="w-24" />
                <span>to</span>
                <Input id="floor-max" type="number" placeholder="Max" defaultValue={1.2} className="w-24" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="industrial" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="industrial-formula">Industrial Property Formula</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Available variables: BASE_RATE, AREA, ZONE_MULTIPLIER, INDUSTRY_TYPE_FACTOR, FACILITY_FACTOR</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              id="industrial-formula"
              value={industrialFormula}
              onChange={(e) => setIndustrialFormula(e.target.value)}
              rows={3}
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry-type-factor">Industry Type Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="industry-min" type="number" placeholder="Min" defaultValue={0.8} className="w-24" />
                <span>to</span>
                <Input id="industry-max" type="number" placeholder="Max" defaultValue={1.6} className="w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facility-factor">Facility Factor Range</Label>
              <div className="flex items-center space-x-2">
                <Input id="facility-min" type="number" placeholder="Min" defaultValue={0.9} className="w-24" />
                <span>to</span>
                <Input id="facility-max" type="number" placeholder="Max" defaultValue={1.4} className="w-24" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave}>Save Formulas</Button>
    </div>
  )
}

