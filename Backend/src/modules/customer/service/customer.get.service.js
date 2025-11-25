import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import {Customer} from "../../index.model.js"

export const serviceGetCustomer = async (user) => {    
    if(!user)
        throw new ApiError(400, "User not found")
    const userId = user.userId
    const chachedSubject = await redisGetKey(`customer:user:${userId}`)
    if(chachedSubject)
        return JSON.parse(chachedSubject)

    const subject = await Customer.findOne({ where: { userId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Customer not found")
    await redisSetKey(`customer:user:${userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetCustomerById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid customer id")
    

    const subject = await Customer.findOne({ where: { customerId: subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Customer not found")
    await redisSetKey(`customer:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}
