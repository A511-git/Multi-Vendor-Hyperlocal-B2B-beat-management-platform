import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getAdminsQuerySchema } from "../schema/index.js"
import {Admin} from "../../index.model.js"

export const serviceGetAdmin = async (user) => {    
    if(!user)
        throw new ApiError(400, "User not found")
    const userId = user.userId
    const chachedSubject = await redisGetKey(`admin:user:${userId}`)
    if(chachedSubject)
        return JSON.parse(chachedSubject)

    const subject = await Admin.findOne({ where: { userId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Admin not found")
    await redisSetKey(`admin:user:${userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGeAdminrById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid Admin id")
    

    const subject = await Admin.findOne({ where: { adminId: subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Admin not found")
    await redisSetKey(`admin:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}

export const serviceGetAdmins = async (data) => {
    const parsed = getAdminsQuerySchema.safeParse(data)
    if(!parsed.success)
        throw new ApiError(400, "Invalid query")
    const { status, offset, limit, sortBy, order } = parsed.data

    const filters = {}
    if(status)
        filters.status = status
    
    const {rows, count} = await Admin.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]], raw: true})
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