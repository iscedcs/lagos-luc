"use server"

import type { RegistrationFormValues } from "./registration-form"

// Since we're not using a database yet, this is a mock function
export async function registerProperty(data: RegistrationFormValues) {
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate a unique property ID
  const propertyId = `LGS-${Math.floor(100000 + Math.random() * 900000)}`

  // In a real app, we would save this to a database
  console.log("Property registered:", { ...data, propertyId })

  return {
    success: true,
    propertyId,
    message: "Property registered successfully",
  }
}

