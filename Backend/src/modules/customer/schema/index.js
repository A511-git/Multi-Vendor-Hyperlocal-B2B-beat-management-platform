import {z} from 'zod'
import {UUID, PHONE, PINCODE, CITY, ADDRESS} from '../../utils/zodHelper.js'


export const createCustomerSchema = z.object({
  userId: UUID(),
  address: ADDRESS(),
  city: CITY(),
  pincode: PINCODE(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export const createCustomerComplaintSchema = z.object({
    customerId: UUID(),
    orderId: UUID(),
    subject: z.string().min(1),
    complaint: z.string().min(1, 'Complaint cannot be empty.'),
})

export const updateCustomerComplaintSchema = createCustomerComplaintSchema.partial();

export const createCustomerComplaintImageSchema = z.object({
    customerComplaintId: UUID(),
    link: z.url("Invalid image URL. Use a valid URL"),
})

export const updateCustomerComplaintImageSchema = createCustomerComplaintImageSchema.partial();

export const getCustomersQuerySchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode").optional(),
  city: z.string().min(1).max(100).optional(),
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
