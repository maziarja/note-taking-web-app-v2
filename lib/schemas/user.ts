import z from "zod";

export const userSchema = z.object({
  email: z.email().min(0, "Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type UserType = z.infer<typeof userSchema>;
