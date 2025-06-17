import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email().max(254, "Email must be less than 254 characters"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

export const SigninSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email must be less than 254 characters"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(64, "Password must be less than 64 characters"),
});
