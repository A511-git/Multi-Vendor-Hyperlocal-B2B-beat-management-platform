import { z } from 'zod'
import { UUID, PHONE, PINCODE, CITY, ADDRESS} from '../../utils/zodHelper.js'

export const createDeliveryPersonSchema = z.object({
    userId: UUID(),
    phone: PHONE(),
    pincode: PINCODE(),
    city: CITY(),
    address: ADDRESS(),
    status: z.enum(["active", "inactive", "blocked"]).optional(),
})

export const getDeliveryPersonQuerySchema = z.object({
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
        ["createdAt", "updatedAt"].includes(val),
      "Invalid sortBy field"
    )
    .default("createdAt")
    .optional(),
  order: z.enum(["ASC", "DESC"]).default("DESC").optional()
});

export const updateDeliveryPersonSchema = createDeliveryPersonSchema.partial();

export const CreateProofOfDeliverySchema = z.object({
    orderId: UUID(),
    deliveryPersonId: UUID(),
    signature: z.enum(["signed", "unsigned"]).optional(),
    link: z.url().optional(),
});

export const UpdateProofOfDeliverySchema = CreateProofOfDeliverySchema.partial();