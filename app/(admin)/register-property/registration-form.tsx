"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  Building,
  User,
  MapPin,
  Archive,
  FileText,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { PropertyIdentificationForm } from "./form-sections/property-identification";
import { OwnerInformationForm } from "./form-sections/owner-information";
import { PropertyClassificationForm } from "./form-sections/property-classification";
import { LocationValueForm } from "./form-sections/location-value";
import { PropertyDetailsForm } from "./form-sections/property-details";
import { ValuationParametersForm } from "./form-sections/valuation-parameters";
import PropertyCertificate from "./property-certificate";

// Define the full form schema combining all sections
export const registrationFormSchema = z.object({
  // Property Identification
  propertyId: z.string().optional(),
  streetAddress: z.string().min(5, "Street address is required"),
  lga: z.string().min(1, "LGA is required"),
  lcda: z.string().optional(),
  ward: z.string().min(1, "Ward is required"),
  gpsCoordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),

  // Owner Information
  ownerName: z.string().min(2, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  identificationNumber: z.string().min(5, "Identification number is required"),
  ownershipType: z.enum(["Individual", "Corporate", "Government"]),

  // Property Classification
  propertyType: z.enum(["Land", "Building", "Mixed-use"]),
  propertyUse: z.enum([
    "Residential",
    "Commercial",
    "Industrial",
    "Public/Government",
  ]),

  // Location Value
  locationClass: z.enum(["High", "Medium", "Low"]),
  locationDecimalWeight: z.number(),
  locationZone: z.string().min(1, "Location zone is required"),

  // Building-Specific Fields (conditional based on propertyType)
  buildingType: z.string().optional(),
  numberOfUnits: z.number().optional(),
  numberOfFloors: z.number().optional(),
  totalCoveredArea: z.number().optional(),
  yearOfConstruction: z.number().optional(),
  buildingCondition: z.enum(["New", "Fair", "Dilapidated"]).optional(),
  wallType: z.string().optional(),
  roofType: z.string().optional(),
  finishingQuality: z.enum(["Basic", "Standard", "Premium"]).optional(),

  // Land-Specific Fields (conditional based on propertyType)
  totalLandArea: z.number().optional(),
  isFenced: z.boolean().optional(),
  isVacant: z.boolean().optional(),
  soilType: z.string().optional(),
  topography: z.string().optional(),

  // Valuation Parameters
  locationWeight: z.number(),
  useWeight: z.number(),
  typeWeight: z.number(),
  buildingFactor: z.number().optional(),
  areaFactor: z.number(),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState("property-identification");
  const [showCertificate, setShowCertificate] = useState(false);
  const [registeredProperty, setRegisteredProperty] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      // Property Identification
      propertyId: "",
      streetAddress: "",
      lga: "",
      lcda: "",
      ward: "",
      gpsCoordinates: {
        latitude: 6.5244,
        longitude: 3.3792,
      },

      // Owner Information
      ownerName: "",
      phoneNumber: "",
      email: "",
      identificationNumber: "",
      ownershipType: "Individual",

      // Property Classification
      propertyType: "Building",
      propertyUse: "Residential",

      // Location Value
      locationClass: "Medium",
      locationDecimalWeight: 1.0,
      locationZone: "",

      // Building Details (defaults)
      buildingType: "",
      numberOfUnits: 1,
      numberOfFloors: 1,
      totalCoveredArea: 0,
      yearOfConstruction: new Date().getFullYear(),
      buildingCondition: "Fair",

      // Land Details (defaults)
      totalLandArea: 0,
      isFenced: false,
      isVacant: false,

      // Valuation Parameters (defaults)
      locationWeight: 1.0,
      useWeight: 0.5,
      typeWeight: 1.0,
      buildingFactor: 1.0,
      areaFactor: 1.0,
    },
  });

  // Debug form state
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const propertyType = form.watch("propertyType");

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      console.log("Form submitted with data:", data);

      // Validate required fields based on property type
      if (
        data.propertyType === "Building" ||
        data.propertyType === "Mixed-use"
      ) {
        if (!data.buildingType) {
          setFormError(
            "Building type is required for Building or Mixed-use properties"
          );
          setActiveTab("property-details");
          return;
        }
      }

      if (data.propertyType === "Land" || data.propertyType === "Mixed-use") {
        if (!data.totalLandArea || data.totalLandArea <= 0) {
          setFormError(
            "Total land area is required for Land or Mixed-use properties"
          );
          setActiveTab("property-details");
          return;
        }
      }

      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = {
        success: true,
        propertyId: `LGS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: "Property registered successfully",
      };

      console.log("Registration result:", result);

      // Set the registered property data for the certificate
      setRegisteredProperty({
        ...data,
        propertyId: result.propertyId,
        registrationDate: new Date().toISOString(),
        expiryDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        qrCodeData: `LGS-PROP-${result.propertyId}`,
      });

      // Show the certificate
      setShowCertificate(true);
    } catch (error) {
      console.error("Error registering property:", error);
      setFormError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setDebugInfo(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Log the current form state
    console.log("Current form state:", form.getValues());
    console.log("Form errors:", form.formState.errors);

    // Check if the form is valid
    if (Object.keys(form.formState.errors).length > 0) {
      const firstError = Object.entries(form.formState.errors)[0];
      const [fieldName, error] = firstError;

      setFormError(
        `Validation error: ${error.message || `Invalid ${fieldName}`}`
      );
      setDebugInfo(form.formState.errors);

      // Navigate to the tab with the error
      if (
        fieldName.includes("gps") ||
        fieldName.includes("street") ||
        fieldName.includes("lga") ||
        fieldName.includes("ward")
      ) {
        setActiveTab("property-identification");
      } else if (
        fieldName.includes("owner") ||
        fieldName.includes("phone") ||
        fieldName.includes("email") ||
        fieldName.includes("identification")
      ) {
        setActiveTab("owner-information");
      } else if (
        fieldName.includes("propertyType") ||
        fieldName.includes("propertyUse")
      ) {
        setActiveTab("property-classification");
      } else if (fieldName.includes("location")) {
        setActiveTab("location-value");
      } else if (
        fieldName.includes("building") ||
        fieldName.includes("land") ||
        fieldName.includes("total") ||
        fieldName.includes("year")
      ) {
        setActiveTab("property-details");
      } else {
        setActiveTab("valuation-parameters");
      }

      return;
    }

    // If form is valid, submit it
    form.handleSubmit(onSubmit)(e);
  };

  const tabs = [
    {
      id: "property-identification",
      label: "Property Identification",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "owner-information",
      label: "Owner Information",
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "property-classification",
      label: "Classification",
      icon: <Archive className="h-4 w-4" />,
    },
    {
      id: "location-value",
      label: "Location",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "property-details",
      label: "Property Details",
      icon: <Building className="h-4 w-4" />,
    },
    {
      id: "valuation-parameters",
      label: "Valuation",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const goToNextTab = () => {
    const nextIndex = currentTabIndex + 1;
    if (nextIndex < tabs.length) {
      setActiveTab(tabs[nextIndex].id);
    }
  };

  const goToPreviousTab = () => {
    const prevIndex = currentTabIndex - 1;
    if (prevIndex >= 0) {
      setActiveTab(tabs[prevIndex].id);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
              {debugInfo && (
                <details className="mt-2 text-xs">
                  <summary>Debug Information</summary>
                  <pre className="mt-2 w-full overflow-auto text-xs">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              )}
            </Alert>
          )}

          <Card>
            <div className="sm:hidden py-3 px-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
                <div className="text-xs text-muted-foreground">
                  Step {currentTabIndex + 1} of {tabs.length}
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="hidden sm:block">
                <TabsList className="grid grid-cols-6 w-full">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-2"
                    >
                      {tab.icon}
                      <span className="hidden lg:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="property-identification">
                <CardContent className="p-6">
                  <PropertyIdentificationForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="owner-information">
                <CardContent className="p-6">
                  <OwnerInformationForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="property-classification">
                <CardContent className="p-6">
                  <PropertyClassificationForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="location-value">
                <CardContent className="p-6">
                  <LocationValueForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="property-details">
                <CardContent className="p-6">
                  <PropertyDetailsForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="valuation-parameters">
                <CardContent className="p-6">
                  <ValuationParametersForm form={form} />
                </CardContent>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousTab}
                disabled={currentTabIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              {currentTabIndex === tabs.length - 1 ? (
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register Property"}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={goToNextTab}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </form>
      </Form>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {registeredProperty && (
            <PropertyCertificate
              property={registeredProperty}
              onClose={() => setShowCertificate(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
