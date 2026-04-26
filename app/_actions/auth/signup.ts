"use server";

import connectDB from "@/lib/database";
import { User } from "@/lib/models/User";
import { userSchema, UserType } from "@/lib/schemas/user";
import { NoteType } from "@/lib/schemas/note";
import { importNotesToDB } from "@/app/_actions/note/importNotesToDB";
import bcrypt from "bcryptjs";

export async function signup(user: UserType, notes: NoteType[]) {
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
    await importNotesToDB(notes, newUser._id.toString());
    return { success: true };
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return { error: "You already have an account" };
    }
    return { error: "Something went wrong" };
  }
}
