"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Check, Key, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UserSecuritySectionProps {
  user: UserInterface
}

export function UserSecuritySection({ user }: UserSecuritySectionProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordResetSent, setPasswordResetSent] = useState(false)

  const handlePasswordReset = () => {
    // In a real app, this would call a server action to send a password reset email
    setPasswordResetSent(true)
    setTimeout(() => setPasswordResetSent(false), 5000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>Password Management</CardTitle>
          </div>
          <CardDescription>Manage user password and reset options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {passwordResetSent && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4" />
              <AlertTitle>Password reset email sent</AlertTitle>
              <AlertDescription>A password reset link has been sent to {user.email}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium">Last password change</div>
            <div className="text-sm text-muted-foreground">30 days ago</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Password strength</div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-3/4"></div>
            </div>
            <div className="text-xs text-amber-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Medium strength - could be improved
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordReset}>Send Password Reset Email</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>Manage account security and authentication options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-factor authentication</Label>
              <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
            </div>
            <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="space-y-4 pt-2">
              <div className="text-sm font-medium">Setup two-factor authentication</div>
              <div className="grid gap-2">
                <Label htmlFor="phone-2fa">Phone number for 2FA</Label>
                <Input id="phone-2fa" placeholder="+1 (555) 123-4567" />
              </div>
              <Button size="sm">Verify Phone Number</Button>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <div className="text-sm font-medium">Recent security events</div>
            <div className="text-sm">
              <div className="flex justify-between py-1 border-b">
                <span>Password changed</span>
                <span className="text-muted-foreground">30 days ago</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Login from new device</span>
                <span className="text-muted-foreground">14 days ago</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Email verification</span>
                <span className="text-muted-foreground">60 days ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

