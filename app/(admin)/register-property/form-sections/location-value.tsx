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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Location zones with their values
const locationZones = {
  "Lagos Island CBD": { class: "High", weight: 1.5 },
  Ikoyi: { class: "High", weight: 1.5 },
  "Victoria Island": { class: "High", weight: 1.5 },
  "Lekki Phase 1": { class: "High", weight: 1.4 },
  Lekki: { class: "Medium", weight: 1.2 },
  "Ikeja GRA": { class: "High", weight: 1.3 },
  Ikeja: { class: "Medium", weight: 1.1 },
  Surulere: { class: "Medium", weight: 1.0 },
  Yaba: { class: "Medium", weight: 1.0 },
  Gbagada: { class: "Medium", weight: 0.9 },
  Magodo: { class: "Medium", weight: 1.0 },
  Ilupeju: { class: "Medium", weight: 0.9 },
  Ogba: { class: "Medium", weight: 0.8 },
  Agege: { class: "Low", weight: 0.7 },
  Oshodi: { class: "Low", weight: 0.8 },
  Mushin: { class: "Low", weight: 0.7 },
  Ikorodu: { class: "Low", weight: 0.7 },
  Badagry: { class: "Low", weight: 0.6 },
  Epe: { class: "Low", weight: 0.6 },
};

interface LocationValueFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function LocationValueForm({ form }: LocationValueFormProps) {
  const locationZone = form.watch("locationZone");

  // Update the decimal weight when location class changes
  useEffect(() => {
    const locationClass = form.watch("locationClass");
    let weight = 1.0;

    if (locationClass === "High") {
      weight = 1.5;
    } else if (locationClass === "Medium") {
      weight = 1.0;
    } else if (locationClass === "Low") {
      weight = 0.75;
    }

    form.setValue("locationDecimalWeight", weight);
    form.setValue("locationWeight", weight);
  }, [form.watch("locationClass")]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Location Value</h3>
        <p className="text-sm text-muted-foreground">
          Select the location class and provide location-specific details
        </p>
      </div>

      {locationZone && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="text-sm">
              <p className="font-medium mb-1">
                Selected Location Zone: {locationZone}
              </p>
              {locationZones[locationZone as keyof typeof locationZones] && (
                <>
                  <p>
                    Class:{" "}
                    {
                      locationZones[locationZone as keyof typeof locationZones]
                        .class
                    }
                  </p>
                  <p>
                    Weight:{" "}
                    {
                      locationZones[locationZone as keyof typeof locationZones]
                        .weight
                    }
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <FormField
        control={form.control}
        name="locationZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Zone</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);

                // Update location class and weight based on zone
                if (locationZones[value as keyof typeof locationZones]) {
                  const zoneInfo =
                    locationZones[value as keyof typeof locationZones];
                  form.setValue("locationClass", zoneInfo.class as any);
                  form.setValue("locationDecimalWeight", zoneInfo.weight);
                  form.setValue("locationWeight", zoneInfo.weight);
                }
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select location zone" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(locationZones).map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The zone determines the location class and value weight
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="locationClass"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Location Class/Zone</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="High" />
                  </FormControl>
                  <FormLabel className="font-normal">High-Value Zone</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Medium" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Medium-Value Zone
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Low" />
                  </FormControl>
                  <FormLabel className="font-normal">Low-Value Zone</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="locationDecimalWeight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Decimal Weight</FormLabel>
            <div className="flex items-center gap-4">
              <FormControl className="flex-1">
                <Slider
                  min={0.5}
                  max={2}
                  step={0.01}
                  value={[field.value]}
                  onValueChange={(values) => {
                    field.onChange(values[0]);
                    form.setValue("locationWeight", values[0]);
                  }}
                  disabled={!!locationZone}
                />
              </FormControl>
              <div className="w-20">
                <Input
                  type="number"
                  min={0.5}
                  max={2}
                  step={0.01}
                  value={field.value}
                  onChange={(e) => {
                    const value = Number.parseFloat(e.target.value);
                    field.onChange(value);
                    form.setValue("locationWeight", value);
                  }}
                  disabled={!!locationZone}
                />
              </div>
            </div>
            <FormDescription>
              This weight affects the property valuation (High = 1.5, Medium =
              1.0, Low = 0.75)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {locationZone && (
        <Alert
          variant="default"
          className="bg-blue-50 text-blue-800 border-blue-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Location values are automatically set based on the selected zone and
            can only be adjusted by authorized personnel.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
