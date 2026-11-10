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

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  id: z
    .string("Please enter your username or email")
    .trim()
    .min(1, "Username or email is required")
    .refine(
      (value) => {
        const isEmail = z.email().safeParse(value).success;
        const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);

        return isEmail || isUsername;
      },
      "Please enter a valid username or email",
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password cannot exceed 64 characters"),
});

export const verifyEmailSchema = z.object({
  token: z
    .string()
    .min(1, "Verification token is required")
    .length(6, "Verification token must be exactly 6 digits")
    .regex(/^\d{6}$/, "Verification token must contain numbers only"),
});

export const resetPasswordSchema = z.object({
  token: z
    .string()
    .length(64, "Invalid reset token")
    .regex(/^[a-f0-9]{64}$/i, "Invalid reset token"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters"),
});