"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, Trash2, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Notification = {
  id: string
  title: string
  type: string
  recipient: string
  status: string
  date: string
  content: string
}

export default function NotificationList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Property Registration Approved",
      type: "Property",
      recipient: "John Doe",
      status: "Delivered",
      date: "April 2, 2025 10:30 AM",
      content:
        "Your property registration for 123 Main Street has been approved. You can now view your property certificate in your dashboard.",
    },
    {
      id: "2",
      title: "Payment Reminder",
      type: "Payment",
      recipient: "Sarah Johnson",
      status: "Pending",
      date: "April 2, 2025 09:15 AM",
      content:
        "This is a friendly reminder that your property tax payment of ₦250,000 is due on April 10, 2025. Please make your payment to avoid late fees.",
    },
    {
      id: "3",
      title: "Document Verification Required",
      type: "Document",
      recipient: "Michael Brown",
      status: "Failed",
      date: "April 1, 2025 03:45 PM",
      content:
        "We need additional documentation to verify your property ownership. Please upload the required documents in your dashboard within 7 days.",
    },
    {
      id: "4",
      title: "Zone Rate Update",
      type: "System",
      recipient: "All Users",
      status: "Delivered",
      date: "March 30, 2025 11:00 AM",
      content:
        "Property tax rates for Zone LG-IKY (Ikoyi) have been updated effective April 1, 2025. Please check the updated rates in the zone management section.",
    },
    {
      id: "5",
      title: "Account Created",
      type: "Account",
      recipient: "Emma Wilson",
      status: "Delivered",
      date: "March 29, 2025 02:30 PM",
      content:
        "Welcome to Lagos Property Map! Your account has been successfully created. You can now register your properties and manage your property taxes.",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Property":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800">
            Property
          </Badge>
        )
      case "Payment":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800">
            Payment
          </Badge>
        )
      case "Document":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-800">
            Document
          </Badge>
        )
      case "System":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-800">
            System
          </Badge>
        )
      case "Account":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-800">
            Account
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const viewNotification = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsViewDialogOpen(true)
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = notifications.filter((notification) => {
    // Apply search filter
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter

    // Apply type filter
    const matchesType = typeFilter === "all" || notification.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Property">Property</SelectItem>
            <SelectItem value="Payment">Payment</SelectItem>
            <SelectItem value="Document">Document</SelectItem>
            <SelectItem value="System">System</SelectItem>
            <SelectItem value="Account">Account</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No notifications found
                </TableCell>
              </TableRow>
            ) : (
              filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.title}</TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>{notification.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => viewNotification(notification)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNotification?.title}</DialogTitle>
            <DialogDescription>
              Sent to {selectedNotification?.recipient} on {selectedNotification?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex justify-between">
              <div>
                <span className="text-sm font-medium">Type:</span>
                <span className="ml-2">{getTypeBadge(selectedNotification?.type || "")}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Status:</span>
                <span className="ml-2">{getStatusBadge(selectedNotification?.status || "")}</span>
              </div>
            </div>
            <div className="border rounded-md p-4 bg-gray-50">
              <p>{selectedNotification?.content}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

