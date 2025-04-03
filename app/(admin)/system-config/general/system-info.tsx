"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function SystemInfo() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshSystemInfo = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">System Version</h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">v2.5.3</p>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Up to date
            </Badge>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Environment</h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Production</p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Stable
            </Badge>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">System Details</h3>
        <div className="grid gap-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Database Version</span>
            <span className="font-medium">PostgreSQL 14.5</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">April 2, 2025 14:30</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">License</span>
            <span className="font-medium">Enterprise (Valid until Dec 31, 2025)</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Server Location</span>
            <span className="font-medium">Lagos, Nigeria</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">API Version</span>
            <span className="font-medium">v3.2.1</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={refreshSystemInfo} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Info
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download System Report
        </Button>
      </div>
    </div>
  )
}

