import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getCustomersQuerySchema } from "../schema/index.js"
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
    return vendor
}

export const serviceGetCustomerById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid customer id")
    

    const subject = await Customer.findOne({ where: { subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Customer not found")
    await redisSetKey(`customer:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetCustomers = async (data) => {
    const parsed = getCustomersQuerySchema.safeParse(data)
    if(!parsed.success)
        throw new ApiError(400, "Invalid query")
    const { pincode, city, status, offset, limit, sortBy, order } = parsed.data

    const filters = {}
    if(pincode)
        filters.pincode = pincode
    if(city)
        filters.city = city
    if(status)
        filters.status = status
    
    const {rows, count} = await Customer.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]] },{raw: true})
    return {
        rows,
        pagination: {
            offset,
            limit,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: Math.ceil(offset / limit) + 1
        }
    }


  
}