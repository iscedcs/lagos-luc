"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit2, Save, X, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ZoneMultiplier = {
  id: string
  zoneName: string
  zoneCode: string
  residentialMultiplier: number
  commercialMultiplier: number
  industrialMultiplier: number
  isEditing?: boolean
}

export default function ZoneMultipliers() {
  const [activeState, setActiveState] = useState("lagos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newZone, setNewZone] = useState<Omit<ZoneMultiplier, "id" | "isEditing">>({
    zoneName: "",
    zoneCode: "",
    residentialMultiplier: 1.0,
    commercialMultiplier: 1.0,
    industrialMultiplier: 1.0,
  })

  const [zoneMultipliers, setZoneMultipliers] = useState<ZoneMultiplier[]>([
    {
      id: "1",
      zoneName: "Ikoyi",
      zoneCode: "LG-IKY",
      residentialMultiplier: 2.5,
      commercialMultiplier: 2.8,
      industrialMultiplier: 2.0,
    },
    {
      id: "2",
      zoneName: "Victoria Island",
      zoneCode: "LG-VI",
      residentialMultiplier: 2.3,
      commercialMultiplier: 2.7,
      industrialMultiplier: 1.9,
    },
    {
      id: "3",
      zoneName: "Lekki Phase 1",
      zoneCode: "LG-LK1",
      residentialMultiplier: 2.0,
      commercialMultiplier: 2.2,
      industrialMultiplier: 1.7,
    },
    {
      id: "4",
      zoneName: "Ikeja GRA",
      zoneCode: "LG-IKJ",
      residentialMultiplier: 1.8,
      commercialMultiplier: 2.0,
      industrialMultiplier: 1.6,
    },
    {
      id: "5",
      zoneName: "Surulere",
      zoneCode: "LG-SRL",
      residentialMultiplier: 1.5,
      commercialMultiplier: 1.6,
      industrialMultiplier: 1.4,
    },
    {
      id: "6",
      zoneName: "Yaba",
      zoneCode: "LG-YBA",
      residentialMultiplier: 1.4,
      commercialMultiplier: 1.5,
      industrialMultiplier: 1.3,
    },
  ])

  const toggleEdit = (id: string) => {
    setZoneMultipliers((zones) =>
      zones.map((zone) => (zone.id === id ? { ...zone, isEditing: !zone.isEditing } : zone)),
    )
  }

  const updateZone = (id: string, field: keyof ZoneMultiplier, value: any) => {
    setZoneMultipliers((zones) =>
      zones.map((zone) =>
        zone.id === id
          ? {
              ...zone,
              [field]: ["residentialMultiplier", "commercialMultiplier", "industrialMultiplier"].includes(field)
                ? Number(value)
                : value,
            }
          : zone,
      ),
    )
  }

  const handleNewZoneChange = (field: keyof Omit<ZoneMultiplier, "id" | "isEditing">, value: any) => {
    setNewZone((prev) => ({
      ...prev,
      [field]: ["residentialMultiplier", "commercialMultiplier", "industrialMultiplier"].includes(field)
        ? Number(value)
        : value,
    }))
  }

  const addNewZone = () => {
    const newId = (zoneMultipliers.length + 1).toString()
    setZoneMultipliers([...zoneMultipliers, { id: newId, ...newZone }])
    setNewZone({
      zoneName: "",
      zoneCode: "",
      residentialMultiplier: 1.0,
      commercialMultiplier: 1.0,
      industrialMultiplier: 1.0,
    })
    setIsAddDialogOpen(false)
  }

  const saveChanges = () => {
    // Save zone multipliers
    console.log({
      state: activeState,
      zoneMultipliers: zoneMultipliers.map(({ isEditing, ...zone }) => zone),
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
        <div className="flex space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Zone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Zone</DialogTitle>
                <DialogDescription>Create a new zone with custom multipliers</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zone-name">Zone Name</Label>
                    <Input
                      id="zone-name"
                      value={newZone.zoneName}
                      onChange={(e) => handleNewZoneChange("zoneName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zone-code">Zone Code</Label>
                    <Input
                      id="zone-code"
                      value={newZone.zoneCode}
                      onChange={(e) => handleNewZoneChange("zoneCode", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residential-multiplier">Residential Multiplier</Label>
                  <Input
                    id="residential-multiplier"
                    type="number"
                    step="0.1"
                    value={newZone.residentialMultiplier}
                    onChange={(e) => handleNewZoneChange("residentialMultiplier", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commercial-multiplier">Commercial Multiplier</Label>
                  <Input
                    id="commercial-multiplier"
                    type="number"
                    step="0.1"
                    value={newZone.commercialMultiplier}
                    onChange={(e) => handleNewZoneChange("commercialMultiplier", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industrial-multiplier">Industrial Multiplier</Label>
                  <Input
                    id="industrial-multiplier"
                    type="number"
                    step="0.1"
                    value={newZone.industrialMultiplier}
                    onChange={(e) => handleNewZoneChange("industrialMultiplier", e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewZone}>Add Zone</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={saveChanges}>Save All Changes</Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone Name</TableHead>
              <TableHead>Zone Code</TableHead>
              <TableHead>Residential</TableHead>
              <TableHead>Commercial</TableHead>
              <TableHead>Industrial</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoneMultipliers.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell>
                  {zone.isEditing ? (
                    <Input value={zone.zoneName} onChange={(e) => updateZone(zone.id, "zoneName", e.target.value)} />
                  ) : (
                    zone.zoneName
                  )}
                </TableCell>
                <TableCell>
                  {zone.isEditing ? (
                    <Input value={zone.zoneCode} onChange={(e) => updateZone(zone.id, "zoneCode", e.target.value)} />
                  ) : (
                    zone.zoneCode
                  )}
                </TableCell>
                <TableCell>
                  {zone.isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={zone.residentialMultiplier}
                      onChange={(e) => updateZone(zone.id, "residentialMultiplier", e.target.value)}
                    />
                  ) : (
                    zone.residentialMultiplier.toFixed(1)
                  )}
                </TableCell>
                <TableCell>
                  {zone.isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={zone.commercialMultiplier}
                      onChange={(e) => updateZone(zone.id, "commercialMultiplier", e.target.value)}
                    />
                  ) : (
                    zone.commercialMultiplier.toFixed(1)
                  )}
                </TableCell>
                <TableCell>
                  {zone.isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={zone.industrialMultiplier}
                      onChange={(e) => updateZone(zone.id, "industrialMultiplier", e.target.value)}
                    />
                  ) : (
                    zone.industrialMultiplier.toFixed(1)
                  )}
                </TableCell>
                <TableCell>
                  {zone.isEditing ? (
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleEdit(zone.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleEdit(zone.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => toggleEdit(zone.id)}>
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

