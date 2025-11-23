import { z } from 'zod'
import { UUID, SKU, PHONE, PERCENT, ADDRESS } from '../../utils/zodHelper.js'

export const createOrderSchema = z.object({
    customerId: UUID(),
    address: ADDRESS(),
    phone: PHONE(),
    amount: z.number().min(0, "Amount cannot be negative"),
    totalDiscount: z.number().min(0, "Discount cannot be negative").optional(),
    finalPrice: z.number().min(0, "Final price cannot be negative"),
    status: z.enum(["placed", "accepted", "dispatched", "out for delivery", "delivered", "returned", "cancelled"]).optional(),
    paymentMethod: z.enum(["online", "offline"]),
    paymentStatus: z.enum(["paid", "unpaid"]).optional(),
});

export const updateOrderSchema = createOrderSchema.partial();

export const createOrderProductSchema = z.object({
    vendorOrderId: UUID(),
    sku: SKU(),
    quantity: z.number().int().min(1, "Quantity cannot be negative"),
    amount: z.number().min(0, "Amount cannot be negative"),
    discount: PERCENT().optional(),
    finalPrice: z.number().min(0, "Final price cannot be negative"),
    acceptanceStatus: z.enum(["fully accepted", "partially accepted", "rejected"]).optional(),
});

export const updateOrderProductSchema = createOrderProductSchema.partial();