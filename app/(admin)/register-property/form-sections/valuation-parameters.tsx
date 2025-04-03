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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lock } from "lucide-react";

interface ValuationParametersFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function ValuationParametersForm({
  form,
}: ValuationParametersFormProps) {
  // Update values based on previous selections
  useEffect(() => {
    // Set use weight based on property use
    const propertyUse = form.watch("propertyUse");
    let useWeight = 0.5; // Default for Residential

    if (propertyUse === "Commercial") {
      useWeight = 1.0;
    } else if (propertyUse === "Industrial") {
      useWeight = 0.8;
    } else if (propertyUse === "Public/Government") {
      useWeight = 0.3;
    }

    form.setValue("useWeight", useWeight);

    // Set type weight based on property type
    const propertyType = form.watch("propertyType");
    let typeWeight = 1.0; // Default for Land

    if (propertyType === "Building") {
      typeWeight = 1.2;
    } else if (propertyType === "Mixed-use") {
      typeWeight = 1.3;
    }

    form.setValue("typeWeight", typeWeight);

    // Set building factor based on building condition
    const buildingCondition = form.watch("buildingCondition");
    let buildingFactor = 1.0;

    if (buildingCondition === "New") {
      buildingFactor = 1.2;
    } else if (buildingCondition === "Fair") {
      buildingFactor = 1.0;
    } else if (buildingCondition === "Dilapidated") {
      buildingFactor = 0.8;
    }

    form.setValue("buildingFactor", buildingFactor);

    // Set area factor based on land area or building area
    const totalLandArea = form.watch("totalLandArea") || 0;
    const totalCoveredArea = form.watch("totalCoveredArea") || 0;
    const area = propertyType === "Land" ? totalLandArea : totalCoveredArea;

    let areaFactor = 1.0;
    if (area > 5000) {
      areaFactor = 1.5;
    } else if (area > 1000) {
      areaFactor = 1.2;
    } else if (area > 500) {
      areaFactor = 1.0;
    } else if (area > 100) {
      areaFactor = 0.8;
    } else {
      areaFactor = 0.6;
    }

    form.setValue("areaFactor", areaFactor);
  }, [
    form.watch("propertyUse"),
    form.watch("propertyType"),
    form.watch("buildingCondition"),
    form.watch("totalLandArea"),
    form.watch("totalCoveredArea"),
  ]);

  // Calculate estimated LUC
  const calculateLUC = () => {
    const locationWeight = form.watch("locationWeight") || 1.0;
    const useWeight = form.watch("useWeight") || 0.5;
    const typeWeight = form.watch("typeWeight") || 1.0;
    const buildingFactor = form.watch("buildingFactor") || 1.0;
    const areaFactor = form.watch("areaFactor") || 1.0;

    const propertyType = form.watch("propertyType");
    const totalLandArea = form.watch("totalLandArea") || 0;
    const totalCoveredArea = form.watch("totalCoveredArea") || 0;

    const area = propertyType === "Land" ? totalLandArea : totalCoveredArea;
    const baseRate = 350; // Naira per sqm - base rate

    let estimatedValue =
      area * baseRate * locationWeight * useWeight * typeWeight * areaFactor;

    if (propertyType !== "Land") {
      estimatedValue *= buildingFactor;
    }

    // Land Use Charge rate (0.5% of property value)
    const lucRate = 0.005;
    const landUseCharge = estimatedValue * lucRate;

    return {
      propertyValue: estimatedValue.toFixed(2),
      landUseCharge: landUseCharge.toFixed(2),
    };
  };

  const { propertyValue, landUseCharge } = calculateLUC();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Valuation Parameters</h3>
        <p className="text-sm text-muted-foreground">
          The parameters used to calculate the Land Use Charge (LUC)
        </p>
      </div>

      <Alert
        variant="default"
        className="bg-blue-50 text-blue-800 border-blue-200"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Valuation parameters are automatically calculated based on property
          details. Only authorized personnel can adjust these values.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="locationWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Location Weight{" "}
                <Lock className="ml-2 h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  disabled
                  className="bg-muted/50"
                />
              </FormControl>
              <FormDescription>
                Based on property location class
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="useWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Use Weight{" "}
                <Lock className="ml-2 h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  disabled
                  className="bg-muted/50"
                />
              </FormControl>
              <FormDescription>
                Based on property use (Residential = 0.5, Commercial = 1.0,
                etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Type Weight{" "}
                <Lock className="ml-2 h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  disabled
                  className="bg-muted/50"
                />
              </FormControl>
              <FormDescription>
                Based on property type (Building = 1.2, Land = 1.0)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("propertyType") !== "Land" && (
          <FormField
            control={form.control}
            name="buildingFactor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Building Factor{" "}
                  <Lock className="ml-2 h-3 w-3 text-muted-foreground" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value || 1.0}
                    disabled
                    className="bg-muted/50"
                  />
                </FormControl>
                <FormDescription>
                  Based on structure type and condition
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="areaFactor"
          render={({ field }) => (
            <FormItem
              className={
                form.watch("propertyType") === "Land" ? "md:col-span-2" : ""
              }
            >
              <FormLabel className="flex items-center">
                Area Factor{" "}
                <Lock className="ml-2 h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  disabled
                  className="bg-muted/50"
                />
              </FormControl>
              <FormDescription>
                Based on property size in square meters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-4" />

      <Card className="bg-emerald-50">
        <CardContent className="p-6">
          <h4 className="text-base font-medium mb-4">
            Estimated Valuation Preview
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Property Value:</div>
              <div className="text-sm font-bold">
                ₦
                {new Intl.NumberFormat().format(
                  Number.parseFloat(propertyValue)
                )}
              </div>

              <div className="text-sm font-medium">Annual Land Use Charge:</div>
              <div className="text-sm font-bold text-emerald-600">
                ₦
                {new Intl.NumberFormat().format(
                  Number.parseFloat(landUseCharge)
                )}
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              <p>
                Note: This is an automated estimation. The final charge may be
                adjusted upon verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
