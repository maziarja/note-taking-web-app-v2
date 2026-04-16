"use server";

import { signIn } from "@/lib/auth";
import connectDB from "@/lib/database";
import { UserType } from "@/lib/schemas/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function login(user: UserType) {
  try {
    await connectDB();

    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // let NextAuth handle redirect
    }

    console.error(error);

    return {
      error: "Invalid email or password",
    };
  }
}
