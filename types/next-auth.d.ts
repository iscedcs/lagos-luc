import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token: string | null;
    user: {
      id?: string | null;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      role?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      deletedAt?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    access_token?: string | null;
    id?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
  }
}
