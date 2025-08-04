"use server";

import { signIn, signOut } from "@/auth";

export async function signInAction(
  email: string,
  password: string,
  callBackUrl?: string
) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (!result) {
    // You can return the error string here if needed
    throw new Error(result?.error || "Invalid email or password");
  }

  return {
    callBackUrl: callBackUrl || "/dashboard",
    url: result.url,
  }; // contains `url` you can use for redirect
}

export async function signOutAction() {
  await signOut();
}
