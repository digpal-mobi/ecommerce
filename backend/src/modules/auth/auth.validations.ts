import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string("Please enter a username").trim(),
    email: z
      .string("Please enter a valid email")
      .email("Please enter a valid email")
      .trim(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password cannot exceed 64 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
      .string()
      .email("Please enter a valid email")
      .trim(),

  password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password cannot exceed 64 characters"),
});