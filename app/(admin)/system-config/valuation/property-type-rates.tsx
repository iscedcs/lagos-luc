"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2, Save, X } from "lucide-react"

type PropertyRate = {
  id: string
  type: string
  subtype: string
  baseRate: number
  unit: string
  isEditing?: boolean
}

export default function PropertyTypeRates() {
  const [activeState, setActiveState] = useState("lagos")
  const [propertyRates, setPropertyRates] = useState<PropertyRate[]>([
    { id: "1", type: "Residential", subtype: "Detached House", baseRate: 25000, unit: "per sqm" },
    { id: "2", type: "Residential", subtype: "Semi-Detached House", baseRate: 22000, unit: "per sqm" },
    { id: "3", type: "Residential", subtype: "Apartment/Flat", baseRate: 20000, unit: "per sqm" },
    { id: "4", type: "Commercial", subtype: "Office Space", baseRate: 35000, unit: "per sqm" },
    { id: "5", type: "Commercial", subtype: "Retail Shop", baseRate: 40000, unit: "per sqm" },
    { id: "6", type: "Commercial", subtype: "Shopping Mall", baseRate: 50000, unit: "per sqm" },
    { id: "7", type: "Industrial", subtype: "Factory", baseRate: 18000, unit: "per sqm" },
    { id: "8", type: "Industrial", subtype: "Warehouse", baseRate: 15000, unit: "per sqm" },
  ])

  const toggleEdit = (id: string) => {
    setPropertyRates((rates) => rates.map((rate) => (rate.id === id ? { ...rate, isEditing: !rate.isEditing } : rate)))
  }

  const updateRate = (id: string, field: keyof PropertyRate, value: any) => {
    setPropertyRates((rates) =>
      rates.map((rate) => (rate.id === id ? { ...rate, [field]: field === "baseRate" ? Number(value) : value } : rate)),
    )
  }

  const saveChanges = () => {
    // Save property type rates
    console.log({
      state: activeState,
      propertyRates: propertyRates.map(({ isEditing, ...rate }) => rate),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
        <Button onClick={saveChanges}>Save All Changes</Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Type</TableHead>
              <TableHead>Subtype</TableHead>
              <TableHead>Base Rate (₦)</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propertyRates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>
                  {rate.isEditing ? (
                    <Select value={rate.type} onValueChange={(value) => updateRate(rate.id, "type", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                        <SelectItem value="Special Purpose">Special Purpose</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    rate.type
                  )}
                </TableCell>
                <TableCell>
                  {rate.isEditing ? (
                    <Input value={rate.subtype} onChange={(e) => updateRate(rate.id, "subtype", e.target.value)} />
                  ) : (
                    rate.subtype
                  )}
                </TableCell>
                <TableCell>
                  {rate.isEditing ? (
                    <Input
                      type="number"
                      value={rate.baseRate}
                      onChange={(e) => updateRate(rate.id, "baseRate", e.target.value)}
                    />
                  ) : (
                    new Intl.NumberFormat("en-NG").format(rate.baseRate)
                  )}
                </TableCell>
                <TableCell>
                  {rate.isEditing ? (
                    <Select value={rate.unit} onValueChange={(value) => updateRate(rate.id, "unit", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per sqm">per sqm</SelectItem>
                        <SelectItem value="per acre">per acre</SelectItem>
                        <SelectItem value="per hectare">per hectare</SelectItem>
                        <SelectItem value="flat rate">flat rate</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    rate.unit
                  )}
                </TableCell>
                <TableCell>
                  {rate.isEditing ? (
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleEdit(rate.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleEdit(rate.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => toggleEdit(rate.id)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

