import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getFieldMenQuerySchema } from "../schema/index.js"
import {FieldMan} from "../../index.model.js"

export const serviceGetFieldMan = async (user) => {    
    if(!user)
        throw new ApiError(400, "User not found")
    const userId = user.userId
    const chachedSubject = await redisGetKey(`fieldMan:user:${userId}`)
    if(chachedSubject)
        return JSON.parse(chachedSubject)

    const subject = await FieldMan.findOne({ where: { userId }, raw: true})
    if(!subject)
        throw new ApiError(400, "FieldMan not found")
    await redisSetKey(`fieldMan:user:${userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetFieldManById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid customer id")
    

    const subject = await FieldMan.findOne({ where: { fieldManId: subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "FieldMan not found")
    await redisSetKey(`fieldMan:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetFieldMen = async (data) => {
    const parsed = getFieldMenQuerySchema.safeParse(data)
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
    
    const {rows, count} = await FieldMan.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]], raw: true})
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