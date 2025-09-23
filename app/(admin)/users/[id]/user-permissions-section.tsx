"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UserPermissionsProps {
  user: UserInterface
}

export function UserPermissionsSection({ user }: UserPermissionsProps) {
  const [role, setRole] = useState(user.role)
  const [changesSaved, setChangesSaved] = useState(false)

  const handleSaveChanges = () => {
    // In a real app, this would call a server action to update permissions
    setChangesSaved(true)
    setTimeout(() => setChangesSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>User Role</CardTitle>
          </div>
          <CardDescription>Manage the user's role and system access level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Assigned Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Auditor">Auditor</SelectItem>
                  <SelectItem value="Property Owner">Property Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "Super Admin" && (
              <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Super Admin has full access to all system features and data. Assign with caution.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Details</CardTitle>
          <CardDescription>Customize specific permissions for this user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {changesSaved && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Changes saved</AlertTitle>
                <AlertDescription>User permissions have been updated successfully.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Property Management</h3>
              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="view-properties" defaultChecked />
                  <Label htmlFor="view-properties">View Properties</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-properties" defaultChecked={role !== "Property Owner"} />
                  <Label htmlFor="edit-properties">Edit Properties</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delete-properties" defaultChecked={role === "Super Admin"} />
                  <Label htmlFor="delete-properties">Delete Properties</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="approve-properties" defaultChecked={role !== "Property Owner"} />
                  <Label htmlFor="approve-properties">Approve Property Registrations</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">User Management</h3>
              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="view-users" defaultChecked={role !== "Property Owner"} />
                  <Label htmlFor="view-users">View Users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-users" defaultChecked={role === "Super Admin" || role === "Admin"} />
                  <Label htmlFor="edit-users">Edit Users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delete-users" defaultChecked={role === "Super Admin"} />
                  <Label htmlFor="delete-users">Delete Users</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">System Configuration</h3>
              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="view-config" defaultChecked={role === "Super Admin" || role === "Admin"} />
                  <Label htmlFor="view-config">View System Configuration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-config" defaultChecked={role === "Super Admin"} />
                  <Label htmlFor="edit-config">Edit System Configuration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manage-zones" defaultChecked={role === "Super Admin" || role === "Admin"} />
                  <Label htmlFor="manage-zones">Manage Property Zones</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Permission Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

