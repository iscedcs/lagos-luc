'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EditProfileButton } from "./edit-profile-button"
import { changeUserPassword } from "@/actions/auth"
import { Mail, Phone, Calendar } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
interface UserProfileServerProps {
  user: UserInterface
}

export function UserProfileServer({ user }: UserProfileServerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await changeUserPassword(formData);
    if (result && result.success) {
      toast.success(result.message || "Password changed successfully");
    } else {
      toast.error(result?.message || "Failed to change password");
    }
    setIsLoading(false);
    return
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive"
      case "manager":
        return "default"
      case "user":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <EditProfileButton user={user} />
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-8">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-balance">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">ID: {user.id}</p>
                </div>
                <Badge variant={getRoleBadgeVariant(user.role)} className="w-fit">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-border pb-2">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-border pb-2">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{formatDate(user.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <p className="text-sm text-muted-foreground">Update your account password here.</p>

              <form name="change-password" onSubmit={handleChangePassword} className="mt-4 space-y-4" method="post">
                <input type="hidden" name="email" value={user.email} />

                <div>
                  <label className="block text-sm text-muted-foreground">Current password</label>
                  <input name="currentPassword" type="password" required className="mt-1 w-full rounded-md border px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground">New password</label>
                  <input name="newPassword" type="password" required className="mt-1 w-full rounded-md border px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground">Confirm new password</label>
                  <input name="confirmPassword" type="password" required className="mt-1 w-full rounded-md border px-3 py-2" />
                </div>

                <div className="flex items-center justify-end">
                  <button disabled={isLoading} type="submit" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white">{isLoading?'Changing...':'Change password'}</button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
