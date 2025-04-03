"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

// Define the google variable
declare global {
  interface Window {
    google: any;
  }
}

// Mock data for LGAs and LCDAs in Lagos
const lagosLGAs = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
];

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
  Ogba: { class: "Low", weight: 0.8 },
  Agege: { class: "Low", weight: 0.7 },
  Oshodi: { class: "Low", weight: 0.8 },
  Mushin: { class: "Low", weight: 0.7 },
  Ikorodu: { class: "Low", weight: 0.7 },
  Badagry: { class: "Low", weight: 0.6 },
  Epe: { class: "Low", weight: 0.6 },
};

// Function to determine location zone based on address components
const determineLocationZone = (
  addressComponents: google.maps.GeocoderAddressComponent[]
): string => {
  // Extract neighborhood, sublocality, and locality from address components
  let neighborhood = "";
  let sublocality = "";
  let locality = "";
  let administrativeArea = "";

  addressComponents.forEach((component) => {
    if (component.types.includes("neighborhood")) {
      neighborhood = component.long_name;
    }
    if (
      component.types.includes("sublocality") ||
      component.types.includes("sublocality_level_1")
    ) {
      sublocality = component.long_name;
    }
    if (component.types.includes("locality")) {
      locality = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      administrativeArea = component.long_name;
    }
  });

  // Check if we're in Lagos State
  if (administrativeArea !== "Lagos" && locality !== "Lagos") {
    // Default to Lagos Island if not in Lagos (this is just for demo purposes)
    return "Lagos Island CBD";
  }

  // Check if any of these match our known zones
  const possibleLocations = [neighborhood, sublocality, locality];

  for (const location of possibleLocations) {
    // Check for exact matches
    if (location && locationZones[location as keyof typeof locationZones]) {
      return location;
    }

    // Check for partial matches
    for (const zone of Object.keys(locationZones)) {
      if (
        location &&
        (zone.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(zone.toLowerCase()))
      ) {
        return zone;
      }
    }
  }

  // Map common areas to zones
  if (neighborhood.includes("Lekki") || sublocality.includes("Lekki")) {
    if (neighborhood.includes("Phase 1") || sublocality.includes("Phase 1")) {
      return "Lekki Phase 1";
    }
    return "Lekki";
  }

  if (neighborhood.includes("Ikoyi") || sublocality.includes("Ikoyi")) {
    return "Ikoyi";
  }

  if (
    neighborhood.includes("Victoria Island") ||
    sublocality.includes("Victoria Island") ||
    neighborhood.includes("V.I.") ||
    sublocality.includes("V.I.")
  ) {
    return "Victoria Island";
  }

  if (neighborhood.includes("Ikeja") || sublocality.includes("Ikeja")) {
    if (neighborhood.includes("GRA") || sublocality.includes("GRA")) {
      return "Ikeja GRA";
    }
    return "Ikeja";
  }

  // Default to the closest match or a default zone
  if (locality === "Lagos") {
    return "Lagos Island CBD"; // Default for Lagos if no specific area is found
  }

  return "Ikeja"; // Default fallback
};

// Custom PlacesAutocomplete component that integrates with our form
function PlacesAutocomplete({
  form,
}: {
  form: UseFormReturn<RegistrationFormValues>;
}) {
  const [address, setAddress] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

  const places = useMapsLibrary("places");
  const geocodingService = useRef<google.maps.Geocoder | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // Initialize services when the places library is loaded
  useEffect(() => {
    if (places) {
      geocodingService.current = new window.google.maps.Geocoder();
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();

      // PlacesService needs a DOM element to work
      const placesDiv = document.createElement("div");
      placesService.current = new window.google.maps.places.PlacesService(
        placesDiv
      );
    }
  }, [places]);

  // Handle clicks outside the predictions dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        predictionsRef.current &&
        !predictionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowPredictions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get predictions when address changes
  const fetchPredictions = useCallback(async (input: string) => {
    if (!autocompleteService.current || input.length < 3) {
      setPredictions([]);
      return;
    }

    try {
      const response = await autocompleteService.current.getPlacePredictions({
        input,
        componentRestrictions: { country: "ng" },
        types: ["address"],
      });

      setPredictions(response.predictions);
      setShowPredictions(true);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    }
  }, []);

  // Debounce the fetchPredictions function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (address) {
        fetchPredictions(address);
      } else {
        setPredictions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [address, fetchPredictions]);

  // Handle place selection
  const handlePlaceSelect = async (placeId: string) => {
    if (!placesService.current) return;

    try {
      const placeDetails = await new Promise<google.maps.places.PlaceResult>(
        (resolve, reject) => {
          placesService.current!.getDetails(
            {
              placeId: placeId,
              fields: ["address_components", "geometry", "formatted_address"],
            },
            (place, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                place
              ) {
                resolve(place);
              } else {
                reject(new Error(`Place details request failed: ${status}`));
              }
            }
          );
        }
      );

      // Update address
      if (placeDetails.formatted_address) {
        form.setValue("streetAddress", placeDetails.formatted_address);
        setAddress(placeDetails.formatted_address);
      }

      // Get coordinates
      if (placeDetails.geometry?.location) {
        const lat = placeDetails.geometry.location.lat();
        const lng = placeDetails.geometry.location.lng();

        form.setValue("gpsCoordinates.latitude", lat);
        form.setValue("gpsCoordinates.longitude", lng);
      }

      // Extract address components
      if (placeDetails.address_components) {
        let ward = "";
        let lga = "";
        let lcda = "";

        placeDetails.address_components.forEach((component) => {
          if (component.types.includes("administrative_area_level_2")) {
            lga = component.long_name;
          }
          if (component.types.includes("administrative_area_level_3")) {
            lcda = component.long_name;
          }
          if (component.types.includes("sublocality_level_2")) {
            ward = component.long_name;
          }
        });

        // Update form with address components
        if (lga) form.setValue("lga", lga);
        if (lcda) form.setValue("lcda", lcda);
        if (ward) form.setValue("ward", ward || "Ward A"); // Default ward if not found

        // Determine location zone
        const locationZone = determineLocationZone(
          placeDetails.address_components
        );
        form.setValue("locationZone", locationZone);

        // Set location class and weight based on zone
        if (locationZones[locationZone as keyof typeof locationZones]) {
          const zoneInfo =
            locationZones[locationZone as keyof typeof locationZones];
          form.setValue("locationClass", zoneInfo.class as any);
          form.setValue("locationDecimalWeight", zoneInfo.weight);
          form.setValue("locationWeight", zoneInfo.weight);
        }
      }

      setShowPredictions(false);
    } catch (error) {
      console.error("Error getting place details:", error);
    }
  };

  // Get current geolocation
  const getGeolocation = () => {
    if (!navigator.geolocation || !geocodingService.current) {
      alert(
        "Geolocation is not supported by your browser or geocoding service is not available"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Update form with coordinates
        form.setValue("gpsCoordinates.latitude", latitude);
        form.setValue("gpsCoordinates.longitude", longitude);

        // Reverse geocode to get address
        try {
          const response = await geocodingService.current?.geocode({
            location: { lat: latitude, lng: longitude },
          });

          if (response && response.results[0]) {
            const place = response.results[0];

            // Update address
            form.setValue("streetAddress", place.formatted_address);
            setAddress(place.formatted_address);

            // Extract address components
            let ward = "";
            let lga = "";
            let lcda = "";

            place.address_components.forEach((component) => {
              if (component.types.includes("administrative_area_level_2")) {
                lga = component.long_name;
              }
              if (component.types.includes("administrative_area_level_3")) {
                lcda = component.long_name;
              }
              if (component.types.includes("sublocality_level_2")) {
                ward = component.long_name;
              }
            });

            // Update form with address components
            if (lga) form.setValue("lga", lga);
            if (lcda) form.setValue("lcda", lcda);
            if (ward) form.setValue("ward", ward || "Ward A");

            // Determine location zone
            const locationZone = determineLocationZone(
              place.address_components
            );
            form.setValue("locationZone", locationZone);

            // Set location class and weight based on zone
            if (locationZones[locationZone as keyof typeof locationZones]) {
              const zoneInfo =
                locationZones[locationZone as keyof typeof locationZones];
              form.setValue("locationClass", zoneInfo.class as any);
              form.setValue("locationDecimalWeight", zoneInfo.weight);
              form.setValue("locationWeight", zoneInfo.weight);
            }
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Could not get your location. Please enter address manually.");
      }
    );
  };

  return (
    <>
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() =>
              address && predictions.length > 0 && setShowPredictions(true)
            }
            placeholder="Search for an address..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        {/* Predictions dropdown */}
        {showPredictions && predictions.length > 0 && (
          <div
            ref={predictionsRef}
            className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {predictions.map((prediction) => (
              <div
                key={prediction.place_id}
                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
                onClick={() => handlePlaceSelect(prediction.place_id)}
              >
                {prediction.description}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={getGeolocation}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Get Current Location
        </Button>
      </div>
    </>
  );
}

interface PropertyIdentificationFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function PropertyIdentificationForm({
  form,
}: PropertyIdentificationFormProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Property Identification</h3>
        <p className="text-sm text-muted-foreground">
          Enter the basic identification details of the property
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property ID/Code</FormLabel>
              <FormControl>
                <Input placeholder="Auto-generated" {...field} disabled />
              </FormControl>
              <FormDescription>
                This will be auto-generated after registration
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <APIProvider apiKey={apiKey} libraries={["places"]}>
                  <PlacesAutocomplete form={form} />
                </APIProvider>
              </FormControl>
              <FormDescription>
                Start typing to search for addresses in Lagos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="lga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LGA</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lagosLGAs.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
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
                  <Input placeholder="Enter LCDA" {...field} />
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
                  <Input placeholder="Enter Ward" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">GPS Coordinates</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Latitude"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
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
                    placeholder="Longitude"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card className="bg-muted/40">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Location Information Preview:</p>
              <p>
                {form.watch("streetAddress") || "[Street Address]"},{" "}
                {form.watch("ward") || "[Ward]"}, {form.watch("lga") || "[LGA]"}
              </p>
              <p className="mt-1">
                Coordinates:{" "}
                {form.watch("gpsCoordinates.latitude")
                  ? form.watch("gpsCoordinates.latitude").toFixed(6)
                  : "[Latitude]"}
                ,{" "}
                {form.watch("gpsCoordinates.longitude")
                  ? form.watch("gpsCoordinates.longitude").toFixed(6)
                  : "[Longitude]"}
              </p>
              <p className="mt-1">
                Zone: {form.watch("locationZone") || "[Not Selected]"}
                {form.watch("locationZone") &&
                  locationZones[
                    form.watch("locationZone") as keyof typeof locationZones
                  ] &&
                  ` (${
                    locationZones[
                      form.watch("locationZone") as keyof typeof locationZones
                    ].class
                  } Value Area)`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
