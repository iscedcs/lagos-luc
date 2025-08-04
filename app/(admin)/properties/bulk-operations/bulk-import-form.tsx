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
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, FileSpreadsheet, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  file: z.instanceof(File, { message: "Please select a file" }),
  importType: z.enum(["new", "update"], {
    message: "Please select an import type",
  }),
  dataFormat: z.enum(["csv", "excel", "json"], {
    message: "Please select a data format",
  }),
  skipValidation: z.boolean().default(false),
  notifyOwners: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function BulkImportForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<{
    status: "success" | "error" | null;
    message: string;
    details?: {
      total: number;
      imported: number;
      errors: number;
      warnings: number;
    };
  }>({ status: null, message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      importType: "new",
      dataFormat: "csv",
      skipValidation: false,
      notifyOwners: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult({ status: null, message: "" });

    // Simulate file upload with progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setUploadProgress((i / totalSteps) * 100);
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful import
    setIsUploading(false);
    setUploadResult({
      status: "success",
      message: "Properties imported successfully",
      details: {
        total: 156,
        imported: 152,
        errors: 3,
        warnings: 1,
      },
    });

    // In a real implementation, you would:
    // 1. Create a FormData object
    // 2. Append the file and other form values
    // 3. Send to a server action
    // 4. Handle the response
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("file", file);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Import Properties</CardTitle>
        <CardDescription>
          Import multiple properties at once using a CSV, Excel, or JSON file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel className="sr-only">File</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center">
                        <FileSpreadsheet className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium mb-2">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Supports CSV, Excel, and JSON formats
                        </p>
                        <Input
                          {...fieldProps}
                          id="file-upload"
                          type="file"
                          accept=".csv,.xlsx,.xls,.json"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("file-upload")?.click()
                          }
                          className="mb-2"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Select File
                        </Button>
                        {value instanceof File && (
                          <p className="text-sm text-gray-600 mt-2">
                            Selected: {value.name} (
                            {(value.size / 1024).toFixed(2)} KB)
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="importType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Import Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select import type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New Properties</SelectItem>
                        <SelectItem value="update">
                          Update Existing Properties
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose whether to import new properties or update existing
                      ones.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Format</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the format of your import file.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="skipValidation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Skip Validation</FormLabel>
                      <FormDescription>
                        Import properties without validating data (not
                        recommended).
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Notify Property Owners</FormLabel>
                      <FormDescription>
                        Send notifications to property owners after import.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadResult.status && (
              <Alert
                variant={
                  uploadResult.status === "success" ? "default" : "destructive"
                }
              >
                {uploadResult.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {uploadResult.status === "success"
                    ? "Import Successful"
                    : "Import Failed"}
                </AlertTitle>
                <AlertDescription>
                  {uploadResult.message}
                  {uploadResult.details && (
                    <div className="mt-2 text-sm">
                      <p>Total records: {uploadResult.details.total}</p>
                      <p>
                        Successfully imported: {uploadResult.details.imported}
                      </p>
                      <p>Errors: {uploadResult.details.errors}</p>
                      <p>Warnings: {uploadResult.details.warnings}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Importing..." : "Import Properties"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <div className="text-xs text-gray-500">
          <p>
            Need help with importing?{" "}
            <a href="#" className="text-primary underline">
              Download our template
            </a>{" "}
            or{" "}
            <a href="#" className="text-primary underline">
              view the documentation
            </a>
            .
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

