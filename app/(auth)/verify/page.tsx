"use client"

import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Check, X } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordWithEmail, verifyEmailVerificationCode } from "@/actions/auth"

// Password validation requirements
const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'One number', regex: /[0-9]/ },
  { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ },
]

// Zod schema for form validation
const verifySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  resetCode: z.string().min(6, "Verification code must be at least 6 characters"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type VerifyValues = z.infer<typeof verifySchema>

// Password requirement checker component
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {meets ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={meets ? "text-green-500" : "text-red-500"}>{label}</span>
    </div>
  )
}

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams?.get("code") || ""
  const email = searchParams?.get("email") || ""
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  
  // Initialize react-hook-form with zod validation
  const form = useForm<VerifyValues>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    defaultValues: {
      email: email,
      resetCode: code,
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Check password requirements in real-time
  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map(req => ({
      ...req,
      meets: req.regex.test(password)
    }))
  }

  const [passwordReqs, setPasswordReqs] = useState(
    passwordRequirements.map(req => ({ ...req, meets: false }))
  )

  // Update password requirements on change
  React.useEffect(() => {
    const password = form.watch("newPassword")
    setPasswordReqs(checkPasswordRequirements(password || ""))
  }, [form.watch("newPassword")])

  const onSubmit = async (data: VerifyValues) => {
    try {
      setFormError("")
      const response = await resetPasswordWithEmail(data.email, data.resetCode, data.newPassword)
      if (response.error) {
        setFormError(response.error)
        return
      }
      toast.success("Password reset successfully")
      router.push("/login")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to reset password"
      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-xl font-semibold">Verify code</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and the verification code sent to you
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter verification code"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <span className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </span>
                    </FormControl>
                    <FormDescription>
                      <span className="mt-2 space-y-2">
                        {passwordReqs.map((req) => (
                          <PasswordRequirement
                            key={req.id}
                            meets={req.meets}
                            label={req.label}
                          />
                        ))}
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </CardHeader>
        </Card>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
