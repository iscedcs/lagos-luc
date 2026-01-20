"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RegistrationFormValues } from "../registration-form";
import { useEffect, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPropertyOwners } from "@/actions/users";

interface OwnerInformationFormProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function OwnerInformationForm({ form }: OwnerInformationFormProps) {
  const [owners, setOwners] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const result = await getPropertyOwners();
        setOwners(result.users || []);
      } catch (error) {
        setOwners([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwners();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Owner Information</h3>
        <p className="text-sm text-muted-foreground">
          Select an existing property owner
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="ownerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Property Owner</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Loading owners..." : "Select an owner"} />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem disabled value="loading">Loading...</SelectItem>
                    ) : owners.length > 0 ? (
                      owners.map((owner) => (
                        <SelectItem key={owner.id} value={owner.id}>
                          {owner.firstName} {owner.lastName} ({owner.email})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-owners">No property owners found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="ownershipType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Ownership Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Individual" />
                  </FormControl>
                  <FormLabel className="font-normal">Individual</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Corporate" />
                  </FormControl>
                  <FormLabel className="font-normal">Corporate</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Government" />
                  </FormControl>
                  <FormLabel className="font-normal">Government</FormLabel>
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
