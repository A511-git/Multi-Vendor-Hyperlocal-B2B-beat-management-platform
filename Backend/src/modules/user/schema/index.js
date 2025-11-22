import { z } from 'zod'
import {EMAIL} from '../../../utils/zodHelper.js'

export const createUserSchema = z.object({
    email: EMAIL(),
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    password: z.string().min(8,"Password must be of 8 characters"),
});

export const updateUserSchema = createUserSchema.partial();

export const loginUserSchema = z.object({
    email: EMAIL(),
    password: z.string().min(8, "Password must be at least 8 characters")
});
