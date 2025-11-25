import {z} from 'zod'
import {UUID} from '../../../utils/zodHelper.js'

export const createAdminSchema = z.object({
  userId: UUID(),
});

export const updateAdminSchema = createAdminSchema.partial();

export const getAdminsQuerySchema = z.object({
  status: z.enum(["active", "inactive", "blocked"]).optional(),
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
        ["createdAt", "updatedAt", "pincode", "city"].includes(val),
      "Invalid sortBy field"
    )
    .default("createdAt")
    .optional(),
  order: z.enum(["ASC", "DESC"]).default("DESC").optional()
});
