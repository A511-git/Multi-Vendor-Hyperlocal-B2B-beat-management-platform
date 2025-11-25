import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getDeliveryPersonQuerySchema } from "../schema/index.js"
import {DeliveryPerson} from "../../index.model.js"

export const serviceGetDeliveryPerson = async (user) => {    
    if(!user)
        throw new ApiError(400, "User not found")
    const userId = user.userId
    const chachedSubject = await redisGetKey(`deliveryPerson:user:${userId}`)
    if(chachedSubject)
        return JSON.parse(chachedSubject)

    const subject = await DeliveryPerson.findOne({ where: { userId }, raw: true})
    if(!subject)
        throw new ApiError(400, "DeliveryPerson not found")
    await redisSetKey(`deliveryPerson:user:${userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetDeliveryPersonById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid delivery person id")
    

    const subject = await DeliveryPerson.findOne({ where: { deliveryPersonId: subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Delivery Person not found")
    await redisSetKey(`customer:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetDeliveryPersons = async (data) => {
    const parsed = getDeliveryPersonQuerySchema.safeParse(data)
    if(!parsed.success)
        throw new ApiError(400, "Invalid query")
    const { pincode, city, status, phone, offset, limit, sortBy, order } = parsed.data

    const filters = {}
    if(pincode)
        filters.pincode = pincode
    if(city)
        filters.city = city
    if(status)
        filters.status = status
    if(phone)
        filters.phone = phone
    
    const {rows, count} = await DeliveryPerson.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]], raw: true})
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