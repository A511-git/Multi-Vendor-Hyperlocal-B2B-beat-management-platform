import { z } from 'zod'
import {EMAIL} from '../../../utils/zodHelper.js'

export const createUserSchema = z.object({
    email: EMAIL(),
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    password: z.string().min(8,"Password must be of 8 characters"),
    role: z.enum(["customer", "vendor", "delivery", "admin"]).default("customer"),
    status: z.enum(["active", "inactive", "blocked"]).default("active"),
});

export const updateUserSchema = createUserSchema.partial();

export const loginUserSchema = z.object({
    email: EMAIL(),
    password: z.string().min(8, "Password must be at least 8 characters")
});



export const getUsersQuerySchema = z.object({
  role: z.enum(["customer", "vendor", "delivery", "admin"]).optional(),
  status: z.enum(["active", "inactive", "blocked"]).optional(),
  search: z.string().min(1).max(100).optional(),
  offset: z
    .string()
    .regex(/^\d+$/, "startIndex must be a positive integer")
    .transform(Number)
    .default("0")
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "limit must be a positive integer")
    .transform(Number)
    .default("20")
    .optional(),
  sortBy: z
    .string()
    .refine(
      (val) =>
        ["createdAt", "updatedAt", "name", "email", "phone"].includes(val),
      "Invalid sortBy field"
    )
    .default("createdAt")
    .optional(),
  order: z.enum(["ASC", "DESC"]).default("DESC").optional()
});
