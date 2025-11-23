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