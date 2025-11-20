import {z} from 'zod'
import {UUID, PHONE, PINCODE, CITY} from '../../utils/zodHelper.js'


export const createCustomerSchema = z.object({
  userId: UUID(),
  phone: PHONE(),
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