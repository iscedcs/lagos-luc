"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Upload, ArrowRightLeft, FileText } from "lucide-react"

export default function DataMigration() {
  const [importSource, setImportSource] = useState("csv")
  const [exportFormat, setExportFormat] = useState("csv")
  const [environment, setEnvironment] = useState("staging")
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationProgress, setMigrationProgress] = useState(0)

  const startMigration = () => {
    setIsMigrating(true)
    setMigrationProgress(0)

    // Simulate migration progress
    const interval = setInterval(() => {
      setMigrationProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsMigrating(false)
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 800)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="environment">Environment Migration</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="import-source">Import Source</Label>
              <Select value={importSource} onValueChange={setImportSource}>
                <SelectTrigger id="import-source">
                  <SelectValue placeholder="Select import source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="excel">Excel File</SelectItem>
                  <SelectItem value="json">JSON File</SelectItem>
                  <SelectItem value="sql">SQL Dump</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="import-target">Target Table</Label>
              <Select defaultValue="properties">
                <SelectTrigger id="import-target">
                  <SelectValue placeholder="Select target table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="payments">Payments</SelectItem>
                  <SelectItem value="zones">Zones</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="truncate" />
                <Label htmlFor="truncate">Truncate table before import</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="headers" defaultChecked />
                <Label htmlFor="headers">File contains headers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="validate" defaultChecked />
                <Label htmlFor="validate">Validate data before import</Label>
              </div>
            </div>

            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop a file, or click to browse</p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground mt-4">Maximum file size: 50MB</p>
            </div>

            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="export-format">
                  <SelectValue placeholder="Select export format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="excel">Excel File</SelectItem>
                  <SelectItem value="json">JSON File</SelectItem>
                  <SelectItem value="sql">SQL Dump</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="export-source">Data to Export</Label>
              <Select defaultValue="all">
                <SelectTrigger id="export-source">
                  <SelectValue placeholder="Select data to export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="properties">Properties Only</SelectItem>
                  <SelectItem value="users">Users Only</SelectItem>
                  <SelectItem value="payments">Payments Only</SelectItem>
                  <SelectItem value="zones">Zones Only</SelectItem>
                  <SelectItem value="documents">Documents Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Export Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-headers" defaultChecked />
                <Label htmlFor="include-headers">Include headers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="compress" defaultChecked />
                <Label htmlFor="compress">Compress export file</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-metadata" />
                <Label htmlFor="include-metadata">Include metadata</Label>
              </div>
            </div>

            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="source-environment">Source Environment</Label>
              <Select defaultValue="production">
                <SelectTrigger id="source-environment">
                  <SelectValue placeholder="Select source environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-environment">Target Environment</Label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger id="target-environment">
                  <SelectValue placeholder="Select target environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Migration Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="structure" defaultChecked />
                <Label htmlFor="structure">Include structure</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="data" defaultChecked />
                <Label htmlFor="data">Include data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="drop-tables" />
                <Label htmlFor="drop-tables">Drop tables before migration</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="anonymize" />
                <Label htmlFor="anonymize">Anonymize sensitive data</Label>
              </div>
            </div>

            {isMigrating ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Migration Progress</span>
                  <span>{migrationProgress}%</span>
                </div>
                <Progress value={migrationProgress} />
                <p className="text-xs text-muted-foreground">
                  Migrating data from Production to {environment.charAt(0).toUpperCase() + environment.slice(1)}...
                </p>
              </div>
            ) : (
              <Button className="w-full" onClick={startMigration}>
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Start Migration
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

