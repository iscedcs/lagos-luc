"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { updateProperty } from "@/actions/properties"

// Define simpler form schemas for different sections
const basicInfoSchema = z.object({
  address: z.string().min(5, "Street address is required"),
  lga: z.string().min(1, "LGA is required"),
  lcda: z.string().optional(),
  ward: z.string().optional(),
})

const propertyDetailsSchema = z.object({
  type: z.string().min(1, "Property type is required"),
  use: z.string().min(1, "Property use is required"),
  buildingType: z.string().optional(),
  numberOfFloors: z.number().optional(),
  numberOfUnits: z.number().optional(),
  totalCoveredArea: z.number().optional(),
  yearOfConstruction: z.number().optional(),
  buildingCondition: z.string().optional(),
})

const valuationSchema = z.object({
  value: z.number().optional().default(0),
  luc: z.number().optional().default(0),
  locationClass: z.string().optional(),
  locationWeight: z.number().optional(),
  useWeight: z.number().optional(),
  typeWeight: z.number().optional(),
  buildingFactor: z.number().optional(),
  areaFactor: z.number().optional(),
})

type BasicInfoValues = z.infer<typeof basicInfoSchema>
type PropertyDetailsValues = z.infer<typeof propertyDetailsSchema>
type ValuationValues = z.infer<typeof valuationSchema>

interface EditPropertyFormProps {
  property: any
  onClose: () => void
}

export default function EditPropertyForm({ property, onClose }: EditPropertyFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Basic Info Form
  const basicForm = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      address: property.address,
      lga: property.lga,
      lcda: property.lcda || "",
      ward: property.ward || "",
    },
  })

  // Property Details Form
  const detailsForm = useForm<PropertyDetailsValues>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      type: property.type,
      use: property.use,
      buildingType: property.buildingType || "",
      numberOfFloors: property.numberOfFloors || 1,
      numberOfUnits: property.numberOfUnits || 1,
      totalCoveredArea: property.totalCoveredArea || 0,
      yearOfConstruction: property.yearOfConstruction || new Date().getFullYear(),
      buildingCondition: property.buildingCondition || "Fair",
    },
  })

  // Valuation Form
  const valuationForm = useForm<ValuationValues>({
    resolver: zodResolver(valuationSchema),
    defaultValues: {
      value: property.value || 0,
      luc: property.luc || 0,
      locationClass: property.locationClass,
      locationWeight: property.locationWeight,
      useWeight: property.useWeight,
      typeWeight: property.typeWeight,
      buildingFactor: property.buildingFactor || 1.0,
      areaFactor: property.areaFactor,
    },
  })

  const handleBasicInfoSubmit = async (data: BasicInfoValues) => {
    setIsSubmitting(true)
    try {
      const updatePayload = {
        address: data.address,
        lga: data.lga,
        lcda: data.lcda || "",
        ward: data.ward || "",
      }

      const result = await updateProperty(property.id, updatePayload)

      if (result.success) {
        toast({
          title: "Success",
          description: "Basic information updated successfully",
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update property",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDetailsSubmit = async (data: PropertyDetailsValues) => {
    setIsSubmitting(true)
    try {
      const updatePayload = {
        propertyType: data.type.toUpperCase(),
        propertyUse: data.use.toUpperCase(),
        buildingType: data.buildingType,
        numberOfUnits: data.numberOfUnits,
        buildingHeight: data.numberOfFloors,
        coveredArea: data.totalCoveredArea,
        yearBuilt: data.yearOfConstruction,
        condition: data.buildingCondition?.toUpperCase(),
      }

      const result = await updateProperty(property.id, updatePayload)

      if (result.success) {
        toast({
          title: "Success",
          description: "Property details updated successfully",
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update property",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleValuationSubmit = async (data: ValuationValues) => {
    setIsSubmitting(true)
    try {
      const locationClassMap: Record<string, string> = {
        "High": "HighValueZone",
        "Medium": "MediumValueZone",
        "Low": "LowValueZone",
      }

      const updatePayload: any = {}
      if (data.value) updatePayload.estimatedValue = data.value
      if (data.luc) updatePayload.annualLUC = data.luc
      if (data.locationClass) updatePayload.locationClass = locationClassMap[data.locationClass] || data.locationClass
      if (data.locationWeight !== undefined) updatePayload.locationWeight = data.locationWeight
      if (data.useWeight !== undefined) updatePayload.useWeight = data.useWeight
      if (data.typeWeight !== undefined) updatePayload.typeWeight = data.typeWeight
      if (data.buildingFactor !== undefined) updatePayload.buildingFactor = data.buildingFactor
      if (data.areaFactor !== undefined) updatePayload.areaFactor = data.areaFactor

      const result = await updateProperty(property.id, updatePayload)

      if (result.success) {
        toast({
          title: "Success",
          description: "Valuation parameters updated successfully",
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update property",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="details">Property Details</TabsTrigger>
        <TabsTrigger value="valuation">Valuation</TabsTrigger>
      </TabsList>

      {/* Basic Information Tab */}
      <TabsContent value="basic" className="space-y-6 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Edit the basic identification details of the property</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...basicForm}>
              <form onSubmit={basicForm.handleSubmit(handleBasicInfoSubmit)} className="space-y-4">
                <FormField
                  control={basicForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={basicForm.control}
                    name="lga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LGA</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select LGA" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Lagos Island">Lagos Island</SelectItem>
                            <SelectItem value="Ikeja">Ikeja</SelectItem>
                            <SelectItem value="Eti-Osa">Eti-Osa</SelectItem>
                            <SelectItem value="Surulere">Surulere</SelectItem>
                            <SelectItem value="Ikorodu">Ikorodu</SelectItem>
                            <SelectItem value="Badagry">Badagry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={basicForm.control}
                    name="lcda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LCDA</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={basicForm.control}
                    name="ward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Basic Info
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Property Details Tab */}
      <TabsContent value="details" className="space-y-6 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Property Classification</CardTitle>
            <CardDescription>Edit the property type and use</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...detailsForm}>
              <form onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)} className="space-y-4">
                <FormField
                  control={detailsForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Land">Land</SelectItem>
                          <SelectItem value="Building">Building</SelectItem>
                          <SelectItem value="Mixed-use">Mixed-use</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="use"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property use" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="buildingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={detailsForm.control}
                    name="numberOfFloors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Floors</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={detailsForm.control}
                    name="numberOfUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Units</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={detailsForm.control}
                  name="totalCoveredArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Covered Area (sqm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="yearOfConstruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Construction</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="buildingCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Condition</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select building condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Dilapidated">Dilapidated</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Details
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Valuation Tab */}
      <TabsContent value="valuation" className="space-y-6 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Valuation Parameters</CardTitle>
            <CardDescription>Edit the property valuation details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...valuationForm}>
              <form onSubmit={valuationForm.handleSubmit(handleValuationSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={valuationForm.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Value (₦)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={valuationForm.control}
                    name="luc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Land Use Charge (₦)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Typically 0.5% of property value</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={valuationForm.control}
                  name="locationClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={valuationForm.control}
                    name="locationWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Weight</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="2.0"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={valuationForm.control}
                    name="useWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Use Weight</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.3"
                            max="1.5"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={valuationForm.control}
                    name="typeWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Weight</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="1.5"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={valuationForm.control}
                    name="buildingFactor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Building Factor</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="1.5"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={valuationForm.control}
                  name="areaFactor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Factor</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0.5"
                          max="1.5"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Valuation
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}