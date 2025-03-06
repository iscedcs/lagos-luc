"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCertificate } from "@/components/property-certificate";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

// Define the form schema with validation
const formSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  area: z.string().min(2, "Area must be at least 2 characters"),
  owner: z.string().min(2, "Owner name must be at least 2 characters"),
  ownerContact: z.string().email("Please enter a valid email address"),
  type: z.enum([
    "Bungalow",
    "Duplex",
    "Flat",
    "Mansion",
    "Office Building",
    "Warehouse",
    "Factory",
    "Undeveloped Land",
    "Other",
  ]),
  usage: z.enum(["Residential", "Commercial", "Industrial", "Mixed Use"]),
  rooms: z.coerce.number().int().min(0, "Number of rooms must be at least 0"),
  landSize: z.coerce
    .number()
    .min(10, "Land size must be at least 10 square meters"),
  description: z.string().optional(),
  zone: z.string().min(2, "Zone must be at least 2 characters"),
  isDeveloped: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export function AddPropertyForm() {
  const router = useRouter();
  const [showCertificate, setShowCertificate] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      area: "",
      owner: "",
      ownerContact: "",
      type: "Bungalow",
      usage: "Residential",
      rooms: 1,
      landSize: 100,
      description: "",
      zone: "Residential",
      isDeveloped: true,
    },
  });

  // Watch the isDeveloped field to conditionally render fields
  const isDeveloped = form.watch("isDeveloped");
  const propertyType = form.watch("type");
  const isUndevelopedLand = propertyType === "Undeveloped Land";

  // Handle form submission
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      // For now, we'll just simulate a delay and show the certificate
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store the form data to use in the certificate
      setFormData(values);

      // Show the certificate
      setShowCertificate(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isDeveloped"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>This is a developed property</FormLabel>
                        <FormDescription>
                          Uncheck if this is an undeveloped land
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <Input placeholder="15 Bourdillon Road" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input placeholder="Ikoyi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Owner</FormLabel>
                      <FormControl>
                        <Input placeholder="John Adebayo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.adebayo@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value === "Undeveloped Land") {
                            form.setValue("isDeveloped", false);
                            form.setValue("rooms", 0);
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {!isDeveloped ? (
                            <SelectItem value="Undeveloped Land">
                              Undeveloped Land
                            </SelectItem>
                          ) : (
                            <>
                              <SelectItem value="Bungalow">Bungalow</SelectItem>
                              <SelectItem value="Duplex">Duplex</SelectItem>
                              <SelectItem value="Flat">Flat</SelectItem>
                              <SelectItem value="Mansion">Mansion</SelectItem>
                              <SelectItem value="Office Building">
                                Office Building
                              </SelectItem>
                              <SelectItem value="Warehouse">
                                Warehouse
                              </SelectItem>
                              <SelectItem value="Factory">Factory</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Usage</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property usage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">
                            Residential
                          </SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isDeveloped && !isUndevelopedLand && (
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Rooms</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size (sqm)</FormLabel>
                      <FormControl>
                        <Input type="number" min="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone</FormLabel>
                      <FormControl>
                        <Input placeholder="Residential" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional details about the property..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Provide any additional information about the
                      property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Add Property"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-4">
          <ScrollArea className="h-[calc(90vh-80px)]">
            {formData && <PropertyCertificate property={formData} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
