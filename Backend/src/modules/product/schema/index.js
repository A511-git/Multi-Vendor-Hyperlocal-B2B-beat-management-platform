import { z } from 'zod'
import { UUID, SKU, PERCENT } from '../../utils/zodHelper.js'

export const createProductSchema = z.object({
    vendorId: UUID(),
    name: z.string().min(1, "Name cannot be empty"),
    description: z.string("Description must be a string").optional(),
    price: z.number().min(0, "Price cannot be less than 0"),
    discount: PERCENT().optional(),
    stock: z.number().int().min(0, "Stock cannot be less than 0"),
    rating: z.number().min(0, "Rating cannot be less than 0").max(5, "Rating cannot be more than 5").optional(),
    status: z.enum(["active", "inactive"]).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createProductImageSchema = z.object({
    sku: SKU(),
    link: z.url("Link must be a valid URL"),
});

export const updateProductImageSchema = createProductImageSchema.partial();

export const createProductReviewSchema = z.object({
    sku: SKU(),
    customerId: UUID(),
    rating: z.number().int().min(1, "Rating cannot be less than 1").max(5, "Rating cannot be more than 5"),
    comment: z.string().max(500, "Comment cannot exceed 500 characters").optional(),
});

export const updateProductReviewSchema = createProductReviewSchema.partial();