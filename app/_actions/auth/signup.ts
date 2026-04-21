"use server";

import connectDB from "@/lib/database";
import { User } from "@/lib/models/User";
import { userSchema, UserType } from "@/lib/schemas/user";
import bcrypt from "bcryptjs";

export async function signup(user: UserType) {
  try {
    await connectDB();

    const validUser = userSchema.safeParse(user);
    if (!validUser.success) {
      throw new Error(validUser.error.issues[0].message);
    }

    const hashedPassword = await bcrypt.hash(validUser.data.password, 10);

    const newUser = new User({
      email: validUser.data.email,
      password: hashedPassword,
    });

    await newUser.save();
    return { success: true, userId: newUser._id.toString() };
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return { error: "You already have an account" };
    }
    return { error: "Something went wrong" };
  }
}
