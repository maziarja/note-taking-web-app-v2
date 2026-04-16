"use server";

import connectDB from "@/lib/database";
import { User } from "@/lib/models/User";
import { UserType } from "@/lib/schemas/user";
import bcrypt from "bcryptjs";

export async function signup(user: UserType) {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true };
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return { error: "You already have an account" };
    }
    return { error: "Something went wrong" };
  }
}
