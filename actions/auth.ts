"use server";

import { signIn, signOut } from "@/auth";
import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE, BASE_URL } from "@/lib/const";
import { AxiosError } from "axios";

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

export async function registerPropertyOwner(formData: FormData) {
  try {
    const response = await axiosRequest(
      lucClient,
      { url: "/api/auth/create", method: "POST", data: formData }
    );
  } catch (error) {
    console.error("Error registering property owner:", error);
  }
  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callBackUrl = formData.get("callbackUrl") as string || "/dashboard";

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (!result) {
    throw new Error(result?.error || "Invalid email or password");
  }

  return {
    callBackUrl: callBackUrl || "/dashboard",
    url: result.url,
  };
}

export async function changeUserPassword(formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const oldPassword = (formData.get("currentPassword") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";
  console.log({email, oldPassword, newPassword})

  if (!email) {
    throw new Error("Email is required to change password");
  }

  if (!oldPassword) {
    throw new Error("Current password is required");
  }

  if (!newPassword) {
    throw new Error("New password is required");
  }

  const url = `${BASE_URL}${API_ROUTE.auth.changeUserPassword.replace("{email}", encodeURIComponent(email))}`;

  try {
    const response = await axiosRequest(
      lucClient,
      { url, method: "POST", data: { oldPassword, newPassword } },
      true
    );
    console.log("Password change response:", response.data);
    return {
      success: true,
      message: "Password changed successfully",
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Error changing password:", e.message);
      return { error: e.message }
    }
  }
}

export async function requestEmailVerificationCode(email: string) {
  try {
    const response = await axiosRequest(lucClient, {
      url: API_ROUTE.auth.requestEmailVerificationCode,
      method: "POST",
      data: { email },  
    });

    console.log({response: response.data});

    if (!response.data) {
      throw new Error("Failed to request email verification code");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const readableError = error.response?.data?.message || error.message;
      return { error: readableError };
    }
    console.error("Error requesting email verification code:", error);
    return { error: "Failed to request email verification code" };
  }
}

export async function verifyEmailVerificationCode(email: string, code: string) {
  try {
    const response = await fetch("/api/auth/verify-email-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify email code");
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying email code:", error);
    return { error: "Failed to verify email code" };
  }
}

export async function resetPasswordWithPhoneNumber(formData: FormData) {
  try {
    const response = await fetch("/api/auth/reset-password-phone", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reset password");
    }
    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Failed to reset password" };
  }
}
export async function sendResetTokenToPhone(formData: FormData) {
  try {
    const response = await fetch("/api/auth/send-reset-token-phone", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send reset token");
    }
    return { success: true };
  } catch (error) {
    console.error("Error sending reset token:", error);
    return { error: "Failed to send reset token" };
  }
}

export async function resetPasswordWithEmail(email: string, resetCode: string, newPassword: string) {
  try {
    const response = await axiosRequest(lucClient, {
      url: API_ROUTE.auth.resetPasswordWithEmail,
      method: "POST",
      data: { 
        email, 
        resetCode,
        newPassword
      },
    });

    if (!response.data) {
      return{
        error:"Failed to verify code and reset password"
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const readableError = error.response?.data?.message || error.message;
      return{
        error:readableError
      };
    }
    console.error("Error verifying code and resetting password:", error);
    return{
      error:"Failed to verify code and reset password"
    };
  }
}

export async function sendResetTokenToEmail(email: string) {
  try {
    const response = await axiosRequest(lucClient, {
      url: API_ROUTE.auth.SendResetTokenToEmail,
      method: "POST",
      data: { email },  
    });

    console.log({response: response.data});

    if (!response.data) {
      throw new Error("Failed to request email verification code");
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const readableError = error.response?.data?.message || error.message;
      return { error: readableError };
    }
    console.error("Error requesting email verification code:", error);
    return { error: "Failed to request email verification code" };
  }
}

export async function SignOutCurrentUser() {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign out");
    }
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: "Failed to sign out" };
  }
}
