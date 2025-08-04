import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API_ROUTE } from "./lib/const";
import axios from "axios";
import { axiosRequest, lucClient } from "./axios-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        try {
          const userResponse = await axiosRequest(lucClient, {
            url: API_ROUTE.auth.login,
            method: "POST",
            data: {
              email,
              password,
            },
          });

          if (userResponse.data) {
            return {
              id: userResponse.data.user.id,
              email: userResponse.data.user.email,
              firstName: userResponse.data.user.firstName,
              lastName: userResponse.data.user.lastName,
              phone: userResponse.data.user.phone,
              role: userResponse.data.user.role,
              createdAt: userResponse.data.user.createdAt,
              updatedAt: userResponse.data.user.updatedAt,
              deletedAt: userResponse.data.user.deletedAt,
              access_token: userResponse.data.jwtToken,
            };
          } else {
            throw new Error("Invalid credentials.");
          }
        } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            const errorMessage =
              e.response.data?.message || "An error occurred during login.";
            console.log(errorMessage);
            throw new Error("An error occurred during login.");
          } else {
            console.log(e);
            throw new Error("An error occurred during login.");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = user.access_token; // Store accessToken in JWT
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.role = user.role;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.deletedAt = user.deletedAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.access_token = token.access_token as string; // Expose accessToken in session
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.phone = token.phone as string;
      session.user.role = token.role as string;
      session.user.createdAt = token.createdAt as string;
      session.user.updatedAt = token.updatedAt as string;
      session.user.deletedAt = token.deletedAt as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
