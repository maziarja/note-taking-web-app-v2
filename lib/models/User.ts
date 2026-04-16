import mongoose, { Model, models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

type User = {
  email: string;
  password?: string;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Must be at least 6 characters, got{VALUE}"],
    },
  },
  {
    timestamps: true,
  },
);

export const User: Model<User> =
  models.User || mongoose.model<User>("User", userSchema);
