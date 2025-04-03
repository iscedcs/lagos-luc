"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Mock user data (in a real app, this would come from a database)
const mockUsers = [
  {
    id: "1",
    email: "admin@lagospropertymap.gov.ng",
    password: "adminpass123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "superadmin@lagospropertymap.gov.ng",
    password: "superadminpass123",
    name: "Super Admin",
    role: "superadmin",
  },
  {
    id: "3",
    email: "agent@lagospropertymap.gov.ng",
    password: "agentpass123",
    name: "LUC Agent",
    role: "agent",
  },
  {
    id: "4",
    email: "owner@example.com",
    password: "ownerpass123",
    name: "Property Owner",
    role: "owner",
  },
];

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  userType: string;
}

export async function loginUser(data: LoginData) {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, we'll just check if the email contains the role
  // In a real app, we would look up the user in a database
  const user = mockUsers.find(
    (u) =>
      u.email.toLowerCase() === data.email.toLowerCase() &&
      u.password === data.password &&
      u.role === data.userType
  );

  if (user) {
    // Set a cookie to "authenticate" the user
    // In a real app, this would be a proper JWT or session token
    const cookieExpires = data.rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : undefined; // 30 days if remember me

    (await cookies()).set({
      name: "user_session",
      value: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: cookieExpires,
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // For demo purposes, allow any login with matching userType
  if (data.password.length >= 8) {
    (await cookies()).set({
      name: "user_session",
      value: JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        name: "Demo User",
        email: data.email,
        role: data.userType,
      }),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: data.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
    });

    return { success: true };
  }

  return {
    success: false,
    message: "Invalid email or password. Please try again.",
  };
}

export async function getUserFromCookie() {
  const userCookie = (await cookies()).get("user_session");

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  (await cookies()).delete("user_session");
  redirect("/login");
}
