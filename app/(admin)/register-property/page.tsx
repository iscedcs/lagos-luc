import type { Metadata } from "next"
import RegistrationForm from "./registration-form"

export const metadata: Metadata = {
  title: "Register Property | Lagos Property Map",
  description: "Register your property in the Lagos Property Map system",
}

export default function RegisterPropertyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Property Registration</h1>
            <p className="mt-2 text-muted-foreground">
              Complete the form below to register your property in the Lagos Property Map system.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}

