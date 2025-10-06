"use client"

import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { UpdateUserProfile } from "@/actions/users"
import { useRouter } from "next/navigation"

interface EditProfileModalProps {
  user: UserInterface;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserInterface) => void;
}
export function EditProfileModal({ user, isOpen, onClose, onSave }: EditProfileModalProps) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setErrors({})
    setShowSuccess(false)

    startTransition(async () => {
      const result = await UpdateUserProfile(formData)

      if (result.error) {
        setErrors({ general: result.error })
      } else {
        setShowSuccess(true)
        router.refresh()
        setTimeout(() => {
          setShowSuccess(false)
          onClose()
        }, 1000)
      }
    })
  }

  const handleCancel = () => {
    setErrors({})
    setShowSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          <DialogDescription>Update your personal information and account settings.</DialogDescription>
        </DialogHeader>

        <form action={handleSubmit}>
          <div className="grid gap-6 py-4">
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {showSuccess && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>Profile updated successfully!</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={user.lastName}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={user.phone}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
              className="gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {showSuccess ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {isPending ? (showSuccess ? "Saved!" : "Saving...") : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
