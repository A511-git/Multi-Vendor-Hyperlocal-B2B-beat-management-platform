import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"

export const serviceDeleteCustomer = async (subject) => {
    if(!subject)
        throw new ApiError(400, "Customer not found")
    const safeSubject = subject.get({ plain: true })
    await subject.destroy()
    await redisDeleteKey(`customer:user:${user.userId}`)
    return safeSubject
}