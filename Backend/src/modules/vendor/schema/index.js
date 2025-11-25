import { z } from 'zod'
import { UUID, PINCODE, CITY, ADDRESS } from '../../utils/zodHelper.js'

export const createVendorSchema = z.object({
    userId: UUID(),
    shopName: z.string().min(1),
    address: ADDRESS(),
    city: CITY(),
    pincode: PINCODE(),
    rating: z.number().min(0, "Rating must be between 0 and 5").max(5, "Rating must be between 0 and 5").optional(),
});

export const updateVendorSchema = createVendorSchema.partial();


export const createVendorOrderSchema = z.object({
    orderId: UUID(),
    vendorId: UUID(),
    deliveryPersonId: UUID().optional().nullable(),
    amount: z.number().min(0),
    totalDiscount: z.number().min(0).optional(),
    finalPrice: z.number().min(0),
    acceptanceStatus: z.enum(["fully accepted", "partially accepted", "rejected"]).optional(),
    vendorStatus: z.enum(["pending", "accepted", "rejected", "packed", "ready for dispatch", "cancelled"]).optional(),
    deliveryStatus: z.enum(["pending", "pickup", "picked up", "out for delivery", "delivered", "failed", "returned"]).optional(),
});

export const updateVendorOrderSchema = createVendorOrderSchema.partial();

export const getVendorsQuerySchema = z.object({
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(["active", "inactive", "blocked"]).default("active").optional(),
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
        ["createdAt", "updatedAt", "pincode", "city", "rating"].includes(val),
      "Invalid sortBy field"
    )
    .default("rating")
    .optional(),
  order: z.enum(["ASC", "DESC"]).default("DESC").optional()
});
