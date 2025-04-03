"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  selectionMethod: z.enum(["filter", "list", "zone"], { required_error: "Please select a method" }),
  propertyType: z.string().optional(),
  zone: z.string().optional(),
  status: z.string().optional(),
  propertyIds: z.string().optional(),
  updateField: z.string({ required_error: "Please select a field to update" }),
  updateValue: z.string({ required_error: "Please enter a value" }),
  notifyOwners: z.boolean().default(false),
  reason: z.string().min(10, { message: "Reason must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function BulkUpdateForm() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [updateResult, setUpdateResult] = useState<{
    status: "success" | "error" | null
    message: string
    details?: {
      total: number
      updated: number
      skipped: number
    }
  }>({ status: null, message: "" })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectionMethod: "filter",
      notifyOwners: false,
      reason: "",
    },
  })

  const selectionMethod = form.watch("selectionMethod")

  async function onSubmit(data: FormValues) {
    setIsUpdating(true)
    setUpdateProgress(0)
    setUpdateResult({ status: null, message: "" })

    // Simulate update process with progress
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setUpdateProgress((i / totalSteps) * 100)
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate successful update
    setIsUpdating(false)
    setUpdateResult({
      status: "success",
      message: "Properties updated successfully",
      details: {
        total: 78,
        updated: 75,
        skipped: 3,
      },
    })

    // In a real implementation, you would:
    // 1. Send the form data to a server action
    // 2. Process the bulk update on the server
    // 3. Return results and handle any errors
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Update Properties</CardTitle>
        <CardDescription>
          Update multiple properties at once by applying the same change to all selected properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="selectionMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selection Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="filter" />
                        </FormControl>
                        <FormLabel className="font-normal">Filter Properties</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="list" />
                        </FormControl>
                        <FormLabel className="font-normal">List Property IDs</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="zone" />
                        </FormControl>
                        <FormLabel className="font-normal">Select by Zone</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectionMethod === "filter" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed-use">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="registered">Registered</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="disputed">Disputed</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="zone-a">Zone A</SelectItem>
                          <SelectItem value="zone-b">Zone B</SelectItem>
                          <SelectItem value="zone-c">Zone C</SelectItem>
                          <SelectItem value="zone-d">Zone D</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {selectionMethod === "list" && (
              <FormField
                control={form.control}
                name="propertyIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property IDs</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter property IDs separated by commas or new lines"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Example: LAG-001, LAG-002, LAG-003</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectionMethod === "zone" && (
              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="zone-a">Zone A</SelectItem>
                        <SelectItem value="zone-b">Zone B</SelectItem>
                        <SelectItem value="zone-c">Zone C</SelectItem>
                        <SelectItem value="zone-d">Zone D</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>All properties in the selected zone will be updated.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Update Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="updateField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field to Update</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="zone">Zone</SelectItem>
                          <SelectItem value="taxRate">Tax Rate</SelectItem>
                          <SelectItem value="valuationDate">Valuation Date</SelectItem>
                          <SelectItem value="propertyClass">Property Classification</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="updateValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Value</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter new value" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Update</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why this bulk update is necessary"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This will be recorded in the audit log.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifyOwners"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Notify Property Owners</FormLabel>
                    <FormDescription>Send notifications to property owners about this update.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {isUpdating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Updating properties...</span>
                  <span>{Math.round(updateProgress)}%</span>
                </div>
                <Progress value={updateProgress} className="h-2" />
              </div>
            )}

            {updateResult.status && (
              <Alert variant={updateResult.status === "success" ? "default" : "destructive"}>
                {updateResult.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{updateResult.status === "success" ? "Update Successful" : "Update Failed"}</AlertTitle>
                <AlertDescription>
                  {updateResult.message}
                  {updateResult.details && (
                    <div className="mt-2 text-sm">
                      <p>Total properties: {updateResult.details.total}</p>
                      <p>Successfully updated: {updateResult.details.updated}</p>
                      <p>Skipped: {updateResult.details.skipped}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Properties"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <div className="text-xs text-gray-500">
          <p>Bulk updates are logged in the system audit trail and can be reviewed in the compliance section.</p>
        </div>
      </CardFooter>
    </Card>
  )
}

