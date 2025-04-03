"use client";

import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { RegistrationFormValues } from "../registration-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Home } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PropertyDetailsFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function PropertyDetailsForm({ form }: PropertyDetailsFormProps) {
  const propertyType = form.watch("propertyType");

  // Set default values based on property type
  useEffect(() => {
    console.log("Property type changed to:", propertyType);

    if (propertyType === "Building" || propertyType === "Mixed-use") {
      // Ensure building fields have default values
      if (!form.getValues("buildingType")) {
        form.setValue("buildingType", "");
      }
      if (!form.getValues("numberOfUnits")) {
        form.setValue("numberOfUnits", 1);
      }
      if (!form.getValues("numberOfFloors")) {
        form.setValue("numberOfFloors", 1);
      }
      if (!form.getValues("totalCoveredArea")) {
        form.setValue("totalCoveredArea", 0);
      }
      if (!form.getValues("yearOfConstruction")) {
        form.setValue("yearOfConstruction", new Date().getFullYear());
      }
      if (!form.getValues("buildingCondition")) {
        form.setValue("buildingCondition", "Fair");
      }
    }

    if (propertyType === "Land" || propertyType === "Mixed-use") {
      // Ensure land fields have default values
      if (!form.getValues("totalLandArea")) {
        form.setValue("totalLandArea", 0);
      }
      if (form.getValues("isFenced") === undefined) {
        form.setValue("isFenced", false);
      }
      if (form.getValues("isVacant") === undefined) {
        form.setValue("isVacant", false);
      }
    }
  }, [propertyType, form]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Property Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter specific information about the property
        </p>
      </div>

      {!propertyType && (
        <Alert>
          <AlertDescription>
            Please select a property type in the Property Classification section
            before proceeding.
          </AlertDescription>
        </Alert>
      )}

      {propertyType === "Mixed-use" ? (
        <Tabs defaultValue="building" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="building" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Building Details
            </TabsTrigger>
            <TabsTrigger value="land" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Land Details
            </TabsTrigger>
          </TabsList>
          <TabsContent value="building">
            <div className="pt-4">
              <BuildingDetailsSection form={form} />
            </div>
          </TabsContent>
          <TabsContent value="land">
            <div className="pt-4">
              <LandDetailsSection form={form} />
            </div>
          </TabsContent>
        </Tabs>
      ) : propertyType === "Building" ? (
        <BuildingDetailsSection form={form} />
      ) : propertyType === "Land" ? (
        <LandDetailsSection form={form} />
      ) : (
        // Default case - show a message if no property type is selected
        <div className="py-8 text-center text-muted-foreground">
          Please select a property type in the Property Classification section.
        </div>
      )}
    </div>
  );
}

function BuildingDetailsSection({
  form,
}: {
  form: UseFormReturn<RegistrationFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="buildingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
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
                  <SelectItem value="Commercial">
                    Commercial Building
                  </SelectItem>
                  <SelectItem value="Industrial">
                    Industrial Building
                  </SelectItem>
                  <SelectItem value="Office">Office Complex</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Units (Flats/Rooms/Shops)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter number of units"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfFloors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Height (Number of Floors)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter number of floors"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  placeholder="Enter covered area in square meters"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value) || 0)
                  }
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
                  placeholder="Enter year of construction"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildingCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Condition</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select building condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Dilapidated">Dilapidated</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-4" />

      <div>
        <h4 className="text-sm font-medium mb-4">
          Additional Building Details (Optional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="wallType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wall Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wall type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Cement Block">Cement Block</SelectItem>
                    <SelectItem value="Brick">Brick</SelectItem>
                    <SelectItem value="Mud">Mud</SelectItem>
                    <SelectItem value="Wood">Wood</SelectItem>
                    <SelectItem value="Stone">Stone</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roofType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roof Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Concrete">Concrete</SelectItem>
                    <SelectItem value="Metal Sheet">Metal Sheet</SelectItem>
                    <SelectItem value="Asbestos">Asbestos</SelectItem>
                    <SelectItem value="Tiles">Tiles</SelectItem>
                    <SelectItem value="Thatch">Thatch</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finishingQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finishing Quality</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select finishing quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function LandDetailsSection({
  form,
}: {
  form: UseFormReturn<RegistrationFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="totalLandArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Land Area (sqm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="Enter land area in square meters"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="isFenced"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Fenced Property</FormLabel>
                  <FormDescription>
                    Is the property fenced or demarcated?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isVacant"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Vacant Land</FormLabel>
                  <FormDescription>
                    Is this a completely vacant land?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="soilType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soil Type (Optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Loamy">Loamy</SelectItem>
                  <SelectItem value="Rocky">Rocky</SelectItem>
                  <SelectItem value="Silty">Silty</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This information helps in valuation and development potential
                assessment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topography (Optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topography" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Flat">Flat</SelectItem>
                  <SelectItem value="Sloped">Sloped</SelectItem>
                  <SelectItem value="Hilly">Hilly</SelectItem>
                  <SelectItem value="Uneven">Uneven</SelectItem>
                  <SelectItem value="Waterfront">Waterfront</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The land's physical features and contour
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
