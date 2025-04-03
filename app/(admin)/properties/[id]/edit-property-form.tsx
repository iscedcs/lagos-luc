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

// Define the form schema
const propertyFormSchema = z.object({
  // Property Identification
  propertyId: z.string(),
  address: z.string().min(5, "Street address is required"),
  lga: z.string().min(1, "LGA is required"),
  lcda: z.string().optional(),
  ward: z.string().min(1, "Ward is required"),
  gpsCoordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  zone: z.string().min(1, "Zone is required"),

  // Owner Information
  ownerName: z.string().min(2, "Owner name is required"),
  ownerType: z.string().min(1, "Owner type is required"),
  ownerContact: z.object({
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(5, "Contact address is required"),
  }),
  ownerRepresentative: z
    .object({
      name: z.string().optional(),
      position: z.string().optional(),
      email: z.string().email("Valid email is required").optional(),
      phone: z.string().optional(),
    })
    .optional(),

  // Property Classification
  type: z.string().min(1, "Property type is required"),
  use: z.string().min(1, "Property use is required"),

  // Building Details (conditional)
  buildingType: z.string().optional(),
  numberOfFloors: z.number().optional(),
  numberOfUnits: z.number().optional(),
  totalCoveredArea: z.number().optional(),
  yearOfConstruction: z.number().optional(),
  buildingCondition: z.string().optional(),

  // Valuation Parameters
  value: z.number().min(1, "Property value is required"),
  luc: z.number().min(1, "LUC amount is required"),
  locationClass: z.string().min(1, "Location class is required"),
  locationWeight: z.number(),
  useWeight: z.number(),
  typeWeight: z.number(),
  buildingFactor: z.number().optional(),
  areaFactor: z.number(),

  // Status
  status: z.string().min(1, "Status is required"),
  paymentStatus: z.string().min(1, "Payment status is required"),
  paymentDue: z.string().min(1, "Payment due date is required"),
})

type PropertyFormValues = z.infer<typeof propertyFormSchema>

interface EditPropertyFormProps {
  property: any
  onClose: () => void
}

export default function EditPropertyForm({ property, onClose }: EditPropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with property data
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      propertyId: property.propertyId,
      address: property.address,
      lga: property.lga,
      lcda: property.lcda || "",
      ward: property.ward,
      gpsCoordinates: {
        latitude: property.gpsCoordinates.latitude,
        longitude: property.gpsCoordinates.longitude,
      },
      zone: property.zone,

      ownerName: property.ownerName,
      ownerType: property.ownerType,
      ownerContact: {
        email: property.ownerContact.email,
        phone: property.ownerContact.phone,
        address: property.ownerContact.address,
      },
      ownerRepresentative: property.ownerRepresentative || {
        name: "",
        position: "",
        email: "",
        phone: "",
      },

      type: property.type,
      use: property.use,

      buildingType: property.buildingType || "",
      numberOfFloors: property.numberOfFloors || 1,
      numberOfUnits: property.numberOfUnits || 1,
      totalCoveredArea: property.totalCoveredArea || 0,
      yearOfConstruction: property.yearOfConstruction || new Date().getFullYear(),
      buildingCondition: property.buildingCondition || "Fair",

      value: property.value,
      luc: property.luc,
      locationClass: property.locationClass,
      locationWeight: property.locationWeight,
      useWeight: property.useWeight,
      typeWeight: property.typeWeight,
      buildingFactor: property.buildingFactor || 1.0,
      areaFactor: property.areaFactor,

      status: property.status,
      paymentStatus: property.paymentStatus,
      paymentDue: property.paymentDue,
    },
  })

  const propertyType = form.watch("type")

  async function onSubmit(data: PropertyFormValues) {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the property
      console.log("Updating property with data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Property updated",
        description: "Property details have been successfully updated",
      })

      onClose()
    } catch (error) {
      console.error("Error updating property:", error)
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="owner">Owner Details</TabsTrigger>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic identification details of the property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormDescription>Property ID cannot be changed</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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

                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Lagos Island CBD">Lagos Island CBD</SelectItem>
                          <SelectItem value="Ikoyi">Ikoyi</SelectItem>
                          <SelectItem value="Victoria Island">Victoria Island</SelectItem>
                          <SelectItem value="Lekki Phase 1">Lekki Phase 1</SelectItem>
                          <SelectItem value="Lekki">Lekki</SelectItem>
                          <SelectItem value="Ikeja GRA">Ikeja GRA</SelectItem>
                          <SelectItem value="Ikeja">Ikeja</SelectItem>
                          <SelectItem value="Surulere">Surulere</SelectItem>
                          <SelectItem value="Yaba">Yaba</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gpsCoordinates.latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpsCoordinates.longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
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
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="disputed">Disputed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Owner Details Tab */}
          <TabsContent value="owner" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>Edit the property owner's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select owner type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Contact Information</h3>

                  <FormField
                    control={form.control}
                    name="ownerContact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownerContact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ownerContact.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("ownerType") === "Corporate" && (
                  <>
                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Representative Information</h3>

                      <FormField
                        control={form.control}
                        name="ownerRepresentative.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Representative Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ownerRepresentative.position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ownerRepresentative.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ownerRepresentative.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Property Details Tab */}
          <TabsContent value="property" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Classification</CardTitle>
                <CardDescription>Edit the property type and use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
              </CardContent>
            </Card>

            {(propertyType === "Building" || propertyType === "Mixed-use") && (
              <Card>
                <CardHeader>
                  <CardTitle>Building Details</CardTitle>
                  <CardDescription>Edit the building-specific information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="buildingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Building Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select building type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Detached">Detached</SelectItem>
                            <SelectItem value="Semi-detached">Semi-detached</SelectItem>
                            <SelectItem value="Flat">Flat/Apartment</SelectItem>
                            <SelectItem value="Tenement">Tenement</SelectItem>
                            <SelectItem value="Duplex">Duplex</SelectItem>
                            <SelectItem value="Bungalow">Bungalow</SelectItem>
                            <SelectItem value="Commercial">Commercial Building</SelectItem>
                            <SelectItem value="Industrial">Industrial Building</SelectItem>
                            <SelectItem value="Office">Office Complex</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                  </div>

                  <FormField
                    control={form.control}
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
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Valuation Parameters</CardTitle>
                <CardDescription>Edit the property valuation and payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="partial">Partial</SelectItem>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentDue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Valuation Weights</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
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

                    <FormField
                      control={form.control}
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
                      control={form.control}
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
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

                    {(propertyType === "Building" || propertyType === "Mixed-use") && (
                      <FormField
                        control={form.control}
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
                    )}

                    <FormField
                      control={form.control}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

