"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Upload } from "lucide-react"

interface UserProfileSectionProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    phone: string
    department: string
    joinDate: string
    avatarUrl: string
  }
}

export function UserProfileSection({ user }: UserProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "suspended":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>User Profile</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
          <CardDescription>Manage user profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? <Input id="name" defaultValue={user.name} /> : <div className="text-sm">{user.name}</div>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? <Input id="email" defaultValue={user.email} /> : <div className="text-sm">{user.email}</div>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input id="phone" defaultValue={user.phone} />
              ) : (
                <div className="text-sm">{user.phone || "Not provided"}</div>
              )}
            </div>

            {user.department && (
              <div className="grid gap-3">
                <Label htmlFor="department">Department</Label>
                {isEditing ? (
                  <Input id="department" defaultValue={user.department} />
                ) : (
                  <div className="text-sm">{user.department}</div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>User account details and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">User ID</div>
              <div className="text-sm">{user.id}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Join Date</div>
              <div className="text-sm">{formatDate(user.joinDate)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Role</div>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

