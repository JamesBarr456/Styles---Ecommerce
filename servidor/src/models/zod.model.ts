import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string({ required_error: "First_name is required" }),
  last_name: z.string({ required_error: "Last_name is required" }),
  dni: z
    .string({ required_error: "DNI is required" })
    .min(7, { message: "DNI must be at least 7 characters" })
    .max(8, { message: "DNI must be at most 8 characters" })
    .regex(/^\d+$/, { message: "DNI must contain only numbers" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  avatar: z.string().optional(),
  number_phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
