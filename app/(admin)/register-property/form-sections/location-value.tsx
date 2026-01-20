"use client";

import { useEffect, useState } from "react";
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
import { getAllZones } from "@/actions/zone";
import type { Zone } from "@/actions/zone";

interface LocationValueFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function LocationValueForm({ form }: LocationValueFormProps) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoadingZones, setIsLoadingZones] = useState(true);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  
  const locationZone = form.watch("locationZone");

  // Fetch zones on component mount
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const result = await getAllZones(1000, 0);
        if (result.success && result.data?.zones) {
          setZones(result.data.zones);
        }
      } catch (error) {
        console.error("Error fetching zones:", error);
      } finally {
        setIsLoadingZones(false);
      }
    };

    fetchZones();
  }, []);

  // Update location class and weight when a zone is selected
  const handleZoneChange = (zoneId: string) => {
    form.setValue("locationZone", zoneId);
    
    const zone = zones.find(z => z.id === zoneId);
    if (zone) {
      setSelectedZone(zone);
      
      // Determine location class based on zone type
      let locationClass = "Medium";
      let weight = 1.0;
      
      if (zone.zoneType === "PREMIUM") {
        locationClass = "High";
        weight = 1.5;
      } else if (zone.zoneType === "DEVELOPING") {
        locationClass = "Low";
        weight = 0.75;
      }
      
      form.setValue("locationClass", locationClass as any);
      form.setValue("locationDecimalWeight", weight);
      form.setValue("locationWeight", weight);
    }
  };

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

  // Get the selected zone object
  const currentZone = zones.find(z => z.id === locationZone);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Location Value</h3>
        <p className="text-sm text-muted-foreground">
          Select the zone and location class for property valuation
        </p>
      </div>

      {currentZone && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="text-sm space-y-1">
              <p className="font-medium">
                Selected Zone: {currentZone.zoneName}
              </p>
              <p>Type: {currentZone.zoneType}</p>
              <p>Tax Rate: {(currentZone.taxRate * 100).toFixed(2)}%</p>
              <p>Avg Property Value: ₦{currentZone.avgPropertyValue.toLocaleString()}</p>
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
              onValueChange={handleZoneChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingZones ? "Loading zones..." : "Select location zone"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoadingZones ? (
                  <SelectItem disabled value="loading">Loading zones...</SelectItem>
                ) : zones.length > 0 ? (
                  zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.zoneName} ({zone.zoneType})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-zones">No zones available</SelectItem>
                )}
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
            <FormLabel>Location Class</FormLabel>
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
