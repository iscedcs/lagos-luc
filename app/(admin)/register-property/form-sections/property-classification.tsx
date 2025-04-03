"use client";

import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { RegistrationFormValues } from "../registration-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, Home, Archive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyClassificationFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function PropertyClassificationForm({
  form,
}: PropertyClassificationFormProps) {
  // Ensure propertyType is set to a valid value
  useEffect(() => {
    const currentType = form.getValues("propertyType");
    if (!currentType) {
      form.setValue("propertyType", "Building");
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Property Classification</h3>
        <p className="text-sm text-muted-foreground">
          Select the type and use of the property
        </p>
      </div>

      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>Property Type</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Land Option */}
              <Card
                className={`cursor-pointer transition-colors ${
                  field.value === "Land"
                    ? "border-emerald-600 bg-emerald-50"
                    : ""
                }`}
                onClick={() => {
                  form.setValue("propertyType", "Land");
                }}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-4 mt-2">
                    <Home className="h-8 w-8 text-emerald-600" />
                  </div>
                  <span className="font-medium">Land</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Vacant or undeveloped property
                  </span>
                </CardContent>
              </Card>

              {/* Building Option */}
              <Card
                className={`cursor-pointer transition-colors ${
                  field.value === "Building"
                    ? "border-emerald-600 bg-emerald-50"
                    : ""
                }`}
                onClick={() => {
                  form.setValue("propertyType", "Building");
                }}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-4 mt-2">
                    <Building className="h-8 w-8 text-emerald-600" />
                  </div>
                  <span className="font-medium">Building</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Developed structures
                  </span>
                </CardContent>
              </Card>

              {/* Mixed-use Option */}
              <Card
                className={`cursor-pointer transition-colors ${
                  field.value === "Mixed-use"
                    ? "border-emerald-600 bg-emerald-50"
                    : ""
                }`}
                onClick={() => {
                  form.setValue("propertyType", "Mixed-use");
                }}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-4 mt-2">
                    <Archive className="h-8 w-8 text-emerald-600" />
                  </div>
                  <span className="font-medium">Mixed-use</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Combination of land and structures
                  </span>
                </CardContent>
              </Card>
            </div>
            <div className="hidden">
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <RadioGroupItem value="Land" id="property-type-land" />
                <RadioGroupItem value="Building" id="property-type-building" />
                <RadioGroupItem value="Mixed-use" id="property-type-mixed" />
              </RadioGroup>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyUse"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Property Use</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Residential" />
                  </FormControl>
                  <FormLabel className="font-normal">Residential</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Commercial" />
                  </FormControl>
                  <FormLabel className="font-normal">Commercial</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Industrial" />
                  </FormControl>
                  <FormLabel className="font-normal">Industrial</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Public/Government" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Public/Government
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
