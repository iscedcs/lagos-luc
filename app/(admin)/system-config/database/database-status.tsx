"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DatabaseStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())
  const [dbStatus, setDbStatus] = useState({
    status: "connected", // connected, warning, error
    connectionPool: 12,
    maxConnections: 100,
    activeQueries: 3,
    storageUsed: 1.2, // GB
    storageTotal: 5, // GB
    avgQueryTime: 45, // ms
    uptime: "5d 12h 34m",
  })

  const refreshStatus = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      setLastRefreshed(new Date())
      // Simulate updated data
      setDbStatus((prev) => ({
        ...prev,
        connectionPool: Math.floor(Math.random() * 20) + 5,
        activeQueries: Math.floor(Math.random() * 10),
        avgQueryTime: Math.floor(Math.random() * 100) + 20,
      }))
    }, 1500)
  }

  useEffect(() => {
    // Initial fetch
    refreshStatus()

    // Set up interval for periodic refresh (every 30 seconds)
    const intervalId = setInterval(() => {
      refreshStatus()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const formatLastRefreshed = () => {
    return lastRefreshed.toLocaleTimeString()
  }

  const getStatusBadge = () => {
    switch (dbStatus.status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = () => {
    switch (dbStatus.status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium">Database Status:</span>
          {getStatusBadge()}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Last updated: {formatLastRefreshed()}</span>
          <Button variant="outline" size="sm" onClick={refreshStatus} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Connection Pool</span>
                  <span className="text-sm text-muted-foreground">
                    {dbStatus.connectionPool} / {dbStatus.maxConnections}
                  </span>
                </div>
                <Progress value={(dbStatus.connectionPool / dbStatus.maxConnections) * 100} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {dbStatus.storageUsed} GB / {dbStatus.storageTotal} GB
                  </span>
                </div>
                <Progress value={(dbStatus.storageUsed / dbStatus.storageTotal) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Active Queries</h4>
                <p className="text-2xl font-bold">{dbStatus.activeQueries}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Avg. Query Time</h4>
                <p className="text-2xl font-bold">{dbStatus.avgQueryTime} ms</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Uptime</h4>
                <p className="text-2xl font-bold">{dbStatus.uptime}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Database Type</h4>
                <p className="text-2xl font-bold">PostgreSQL</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Database Information</h3>
        <div className="grid gap-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Database Name</span>
            <span className="font-medium">lagos_property_map_prod</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Host</span>
            <span className="font-medium">db.lagos-property-map.com</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">PostgreSQL 14.5</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Last Backup</span>
            <span className="font-medium">April 2, 2025 02:00 AM</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">SSL Enabled</span>
            <span className="font-medium">Yes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

