import {z} from 'zod'
import {UUID} from '../../../utils/zodHelper.js'

export const createAdminSchema = z.object({
  userId: UUID(),
});

export const updateAdminSchema = createAdminSchema.partial();

