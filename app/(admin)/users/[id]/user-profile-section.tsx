"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Upload } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"
import { UpdateUser } from "@/actions/users"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface UserProfileSectionProps {
  user: UserInterface,
  status?: string
  department?: string
  avatarUrl?: string
}

export function UserProfileSection({ user, avatarUrl, department, status }: UserProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    // department: user.department || "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSave = () => {
    const formData = new FormData()
    formData.append("firstName", formState.firstName)
    formData.append("lastName", formState.lastName)
    formData.append("email", formState.email)
    formData.append("phone", formState.phone)
    // formData.append("department", formState.department)

    startTransition(() => {
      UpdateUser(formData, user.id)
        .then(({ error }) => {
          if (error) {
            toast.error(error)
            return
          }
          toast.success("User updated successfully")
          setIsEditing(false)
          router.refresh()
        })
        .catch((error) => {
          toast.error("Failed to update user")
          console.error("Failed to update user:", error)
        })
    })
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
              <AvatarImage src={avatarUrl ? avatarUrl : 'https://i.pravatar.cc/120'} alt={`${user.firstName}-${user.lastName}-image`} />
              <AvatarFallback className="text-lg">
                {getInitials(`${user.firstName} ${user.lastName}`)}
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
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input id="firstName" value={formState.firstName} onChange={handleInputChange} />
              ) : (
                <div className="text-sm">{user.firstName}</div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input id="lastName" value={formState.lastName} onChange={handleInputChange} />
              ) : (
                <div className="text-sm">{user.lastName}</div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input id="email" value={formState.email} onChange={handleInputChange} />
              ) : (
                <div className="text-sm">{user.email}</div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input id="phone" value={formState.phone} onChange={handleInputChange} />
              ) : (
                <div className="text-sm">{user.phone || "Not provided"}</div>
              )}
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
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
              <div className="text-sm">{formatDate(user.createdAt)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Role</div>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            {/* <div>
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

