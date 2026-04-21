"use server";

import { signIn } from "@/lib/auth";
import connectDB from "@/lib/database";
import { userSchema, UserType } from "@/lib/schemas/user";
// import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function login(user: UserType) {
  try {
    await connectDB();

    const validUser = userSchema.safeParse(user);
    if (!validUser.success) {
      throw new Error(validUser.error.issues[0].message);
    }

    await signIn("credentials", {
      email: validUser.data.email,
      password: validUser.data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    // if (isRedirectError(error)) {
    //   throw error; // let NextAuth handle redirect
    // }
    console.error(error);
    return {
      error: "Invalid email or password",
    };
  }
}
