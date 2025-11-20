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

export const updateDeliveryPersonSchema = createDeliveryPersonSchema.partial();

export const CreateProofOfDeliverySchema = z.object({
    orderId: UUID(),
    deliveryPersonId: UUID(),
    signature: z.enum(["signed", "unsigned"]).optional(),
    link: z.url().optional(),
});

export const UpdateProofOfDeliverySchema = CreateProofOfDeliverySchema.partial();