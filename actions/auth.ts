"use server"

import { signIn } from "@/auth";

export async function signInAction(email: string, password: string) {
    const result = await signIn('credentials', {
        email,
        password
    });
    return result
}