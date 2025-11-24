import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"
import {UUID} from "../../../utils/zodHelper.js"
import {Customer} from "../../index.model.js"

export const serviceDeleteCustomer = async (user) => {
    if(!UUID.safeParse(user.userId).success)
        throw new ApiError(400, "Invalid id")

    const  subject = await Customer.findOne({ where: { user: user.userId } })
    if(!subject)
        throw new ApiError(400, "Customer not found")

    const safeSubject = subject.get({ plain: true })
    await subject.destroy()
    redisDeleteKey(`customer:user:${user.userId}`)
    return safeSubject
}