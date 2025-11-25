import { z } from 'zod'
import { UUID,PHONE, PINCODE, CITY, ADDRESS } from '../../utils/zodHelper.js'

export const createBeatSchema = z.object({
  city: CITY(),
  pincode: PINCODE(),
});

export const updateBeatSchema = createBeatSchema.partial();

export const createBeatAssignmentSchema = z.object({
  beatId: UUID(),
  fieldManId: UUID(),
  status: z.enum(["assigned", "unassigned"]).optional(),
});

export const updateBeatAssignmentSchema = createBeatAssignmentSchema.partial();

export const createFeedbackSchema = z.object({
  storeId: UUID(),
  fieldManId: UUID(),
  feedback: z.string().min(1, "Feedback cannot be empty.").max(500, "Feedback cannot exceed 500 characters.")
});

export const updateFeedbackSchema = createFeedbackSchema.partial();

export const createFieldManAttendanceSchema = z.object({
    fieldManId: UUID(),
    date: z.string(), // ISO date string expected
    attendanceStatus: z.enum(["present", "absent"]),
})

export const updateFieldManAttendanceSchema = createFieldManAttendanceSchema.partial()

export const createFieldManSchema = z.object({
    userId: UUID(),
    phone: PHONE(),
    city: CITY(),
    pincode: PINCODE(),
    address: ADDRESS(),
})

export const updateFieldManSchema = createFieldManSchema.partial();


export const createFieldManSaleOrderSchema = z.object({
    fieldManSaleId: UUID(),
    productName: z.string().min(1, "Product name cannot be empty.").max(100, "Product name cannot exceed 100 characters."),
    quantity: z.number().int().min(1, "Quantity must be a positive integer."),
});

export const updateFieldManSaleOrderSchema = createFieldManSaleOrderSchema.partial();

export const createFieldManSaleSchema = z.object({
    fieldManId: UUID(),
    storeId: UUID(),
    date: z.string(),
    status: z.enum(["pending", "closed", "cancelled"]).optional(),
});

export const updateFieldManSaleSchema = createFieldManSaleSchema.partial();

export const createStoreSchema = z.object({
    beatId: UUID(),
    storeName: z.string().min(1, "Store name cannot be empty.").max(100, "Store name cannot exceed 100 characters."),
    city: CITY(),
    pincode: PINCODE(),
});

export const UpdateStoreSchema = createStoreSchema.partial();

export const createVisitLogSchema = z.object({
    beatId: UUID(),
    storeId: UUID(),
    fieldManId: UUID(),
    visited: z.enum(["visited", "unvisited"]),
    remark: z.string().optional(),
    date: z.string(),
});

export const updateVisitLogSchema = createVisitLogSchema.partial();

