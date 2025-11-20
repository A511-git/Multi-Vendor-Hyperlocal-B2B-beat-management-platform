import { z } from 'zod'
import {EMAIL} from '../../utils/zodHelper.js'

export const createUserSchema = z.object({
    email: EMAIL(),
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    password: z.string().min(8,"Password must be of 8 characters"),
    role: z.enum(['customer', 'seller', 'deliveryMan', 'fieldMan', 'admin']),
});

export const updateUserSchema = createUserSchema.partial();