import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getDeliveryPersonQuerySchema } from "../schema/index.js"
import {DeliveryPerson, Vendor} from "../../index.model.js"

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

export const serviceGetDeliveryPersons = async (data,user) => {
    const parsed = getDeliveryPersonQuerySchema.safeParse(data)
    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }
    const { offset, limit, sortBy, order } = parsed.data

    let subject = await redisGetKey(`${user.role}:user:${user.userId}`)
    if(!subject)
        if(user.role === "vendor")
            subject = await Vendor.findOne({ where: { userId: user.userId }, raw: true})
        else
            throw new ApiError(400, "Unauthorized")

    const filters = {
        city: subject.city,
        pincode: subject.pincode
    }
    
    const {rows, count} = await DeliveryPerson.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]], raw: true})
    return {
        rows,
        pagination: {
            offset,
            limit,
            count
        }
    }  
}