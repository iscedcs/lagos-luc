"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface UserActivitySectionProps {
  userId: string
}

export function UserActivitySection({ userId }: UserActivitySectionProps) {
  // Mock data - in a real app, this would come from a server action
  const activityLogs = [
    {
      id: "1",
      action: "Login",
      timestamp: "2023-04-01T10:30:00Z",
      ipAddress: "192.168.1.1",
      details: "Successful login from Chrome on Windows",
    },
    {
      id: "2",
      action: "Property Registration",
      timestamp: "2023-03-28T14:20:00Z",
      ipAddress: "192.168.1.1",
      details: "Registered property at 123 Main Street",
    },
    {
      id: "3",
      action: "Profile Update",
      timestamp: "2023-03-25T09:15:00Z",
      ipAddress: "192.168.1.1",
      details: "Updated phone number",
    },
    {
      id: "4",
      action: "Password Change",
      timestamp: "2023-03-01T16:45:00Z",
      ipAddress: "192.168.1.1",
      details: "Changed account password",
    },
    {
      id: "5",
      action: "Document Upload",
      timestamp: "2023-02-15T11:30:00Z",
      ipAddress: "192.168.1.1",
      details: "Uploaded property deed for 123 Main Street",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>User Activity</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <CardDescription>Recent user activity and system interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Activity</TabsTrigger>
              <TabsTrigger value="logins">Logins</TabsTrigger>
              <TabsTrigger value="properties">Property Actions</TabsTrigger>
              <TabsTrigger value="account">Account Changes</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="logins">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs
                      .filter((log) => log.action === "Login")
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.action}</TableCell>
                          <TableCell>{formatDate(log.timestamp)}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs
                      .filter((log) => log.action.includes("Property") || log.action.includes("Document"))
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.action}</TableCell>
                          <TableCell>{formatDate(log.timestamp)}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="account">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs
                      .filter((log) => log.action.includes("Profile") || log.action.includes("Password"))
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.action}</TableCell>
                          <TableCell>{formatDate(log.timestamp)}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Load More Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

