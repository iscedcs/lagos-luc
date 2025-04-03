"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const formSchema = z.object({
  verificationMethod: z.enum(["pending", "zone", "list", "file"], { required_error: "Please select a method" }),
  zone: z.string().optional(),
  propertyIds: z.string().optional(),
  file: z.instanceof(File).optional(),
  verificationAction: z.enum(["approve", "reject", "flag"], { required_error: "Please select an action" }),
  verificationNote: z.string().min(10, { message: "Note must be at least 10 characters" }),
  generateCertificates: z.boolean().default(false),
  notifyOwners: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

// Mock data for pending properties
const pendingProperties = [
  { id: "LAG-1001", address: "123 Lagos Ave", type: "Residential", owner: "John Doe", submittedDate: "2023-04-15" },
  { id: "LAG-1002", address: "456 Ikeja Blvd", type: "Commercial", owner: "Jane Smith", submittedDate: "2023-04-16" },
  {
    id: "LAG-1003",
    address: "789 Victoria Island",
    type: "Mixed Use",
    owner: "Robert Johnson",
    submittedDate: "2023-04-17",
  },
  {
    id: "LAG-1004",
    address: "321 Lekki Phase 1",
    type: "Residential",
    owner: "Mary Williams",
    submittedDate: "2023-04-18",
  },
  { id: "LAG-1005", address: "654 Ajah Road", type: "Commercial", owner: "David Brown", submittedDate: "2023-04-19" },
]

export default function BulkVerificationForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processResult, setProcessResult] = useState<{
    status: "success" | "error" | null
    message: string
    details?: {
      total: number
      approved: number
      rejected: number
      flagged: number
    }
  }>({ status: null, message: "" })
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationMethod: "pending",
      verificationAction: "approve",
      verificationNote: "",
      generateCertificates: false,
      notifyOwners: true,
    },
  })

  const verificationMethod = form.watch("verificationMethod")

  function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelectedProperties(pendingProperties.map((prop) => prop.id))
    } else {
      setSelectedProperties([])
    }
  }

  function handleSelectProperty(id: string) {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(selectedProperties.filter((propId) => propId !== id))
    } else {
      setSelectedProperties([...selectedProperties, id])
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue("file", file)
    }
  }

  async function onSubmit(data: FormValues) {
    setIsProcessing(true)
    setProcessProgress(0)
    setProcessResult({ status: null, message: "" })

    // Simulate verification process with progress
    const totalSteps = 10
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setProcessProgress((i / totalSteps) * 100)
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate successful verification
    setIsProcessing(false)
    setProcessResult({
      status: "success",
      message: "Properties verified successfully",
      details: {
        total: 42,
        approved: 38,
        rejected: 3,
        flagged: 1,
      },
    })

    // In a real implementation, you would:
    // 1. Send the form data and selected properties to a server action
    // 2. Process the bulk verification on the server
    // 3. Return results and handle any errors
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Verification</CardTitle>
        <CardDescription>
          Verify multiple properties at once to approve, reject, or flag for further review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="verificationMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending Properties</SelectItem>
                      <SelectItem value="zone">By Zone</SelectItem>
                      <SelectItem value="list">Property ID List</SelectItem>
                      <SelectItem value="file">Upload File</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose how you want to select properties for verification.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {verificationMethod === "pending" && (
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Pending Properties</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        onCheckedChange={(checked) => {
                          if (typeof checked === "boolean") {
                            if (checked) {
                              setSelectedProperties(pendingProperties.map((prop) => prop.id))
                            } else {
                              setSelectedProperties([])
                            }
                          }
                        }}
                        checked={selectedProperties.length === pendingProperties.length}
                      />
                      <label htmlFor="select-all" className="text-sm">
                        Select All
                      </label>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Property ID</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Submitted Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProperties.includes(property.id)}
                            onCheckedChange={() => handleSelectProperty(property.id)}
                          />
                        </TableCell>
                        <TableCell>{property.id}</TableCell>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{property.owner}</TableCell>
                        <TableCell>{property.submittedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 border-t bg-gray-50 text-sm text-gray-500">
                  Showing {pendingProperties.length} pending properties. {selectedProperties.length} selected.
                </div>
              </div>
            )}

            {verificationMethod === "zone" && (
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
                    <FormDescription>All pending properties in the selected zone will be processed.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {verificationMethod === "list" && (
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

            {verificationMethod === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="sr-only">File</FormLabel>
                      <FormControl>
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium mb-2">Upload a file with property IDs</p>
                          <p className="text-xs text-gray-500 mb-4">Supports CSV, Excel, and text formats</p>
                          <Input
                            {...fieldProps}
                            id="file-upload"
                            type="file"
                            accept=".csv,.xlsx,.xls,.txt"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("file-upload")?.click()}
                            className="mb-2"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Select File
                          </Button>
                          {value instanceof File && (
                            <p className="text-sm text-gray-600 mt-2">
                              Selected: {value.name} ({(value.size / 1024).toFixed(2)} KB)
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Verification Action</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="verificationAction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="approve">Approve All</SelectItem>
                          <SelectItem value="reject">Reject All</SelectItem>
                          <SelectItem value="flag">Flag for Review</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="verificationNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add a note about this verification action"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="generateCertificates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Generate Certificates</FormLabel>
                      <FormDescription>
                        Automatically generate property certificates for approved properties.
                      </FormDescription>
                    </div>
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
                      <FormDescription>
                        Send notifications to property owners about the verification result.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing verification...</span>
                  <span>{Math.round(processProgress)}%</span>
                </div>
                <Progress value={processProgress} className="h-2" />
              </div>
            )}

            {processResult.status && (
              <Alert variant={processResult.status === "success" ? "default" : "destructive"}>
                {processResult.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {processResult.status === "success" ? "Verification Successful" : "Verification Failed"}
                </AlertTitle>
                <AlertDescription>
                  {processResult.message}
                  {processResult.details && (
                    <div className="mt-2 text-sm">
                      <p>Total properties: {processResult.details.total}</p>
                      <p>Approved: {processResult.details.approved}</p>
                      <p>Rejected: {processResult.details.rejected}</p>
                      <p>Flagged for review: {processResult.details.flagged}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || (verificationMethod === "pending" && selectedProperties.length === 0)}
              >
                {isProcessing ? "Processing..." : "Process Verification"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <div className="text-xs text-gray-500">
          <p>All verification actions are logged in the system audit trail for compliance purposes.</p>
        </div>
      </CardFooter>
    </Card>
  )
}

