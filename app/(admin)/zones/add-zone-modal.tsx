"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  zoneName: z.string().min(2, {
    message: "Zone name must be at least 2 characters.",
  }),
  zoneType: z.string({
    required_error: "Please select a zone type.",
  }),
  residentialRate: z.string().refine((val) => !isNaN(Number.parseFloat(val)), {
    message: "Residential rate must be a number.",
  }),
  commercialRate: z.string().refine((val) => !isNaN(Number.parseFloat(val)), {
    message: "Commercial rate must be a number.",
  }),
  industrialRate: z.string().refine((val) => !isNaN(Number.parseFloat(val)), {
    message: "Industrial rate must be a number.",
  }),
})

export default function AddZoneModal() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zoneName: "",
      zoneType: "",
      residentialRate: "0.5",
      commercialRate: "0.8",
      industrialRate: "0.6",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would submit this data to your backend
    console.log(values)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Zone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Zone</DialogTitle>
          <DialogDescription>Create a new property zone with tax rates for different property types.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="zoneName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Ikoyi" {...field} />
                  </FormControl>
                  <FormDescription>Enter the name of the geographical zone.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zoneType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="developing">Developing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the type of zone for classification purposes.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="residentialRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commercialRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commercial Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industrialRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industrial Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Zone</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

