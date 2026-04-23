"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Notes } from "@/lib/models/Note";
import { User } from "@/lib/models/User";

export async function deleteAccount() {
  try {
    await connectDB();
    const session = await auth();
    if (!session) {
      throw new Error("UNAUTHORIZED");
    }

    await Notes.deleteOne({ userId: session.user?.id });
    await User.findByIdAndDelete(session.user?.id);

    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
