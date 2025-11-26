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

export const serviceGeAdminById = async (subjectId) => {
    if(!UUID.safeParse(subjectId).success)
        throw new ApiError(400, "Invalid Admin id")
    

    const subject = await Admin.findOne({ where: { adminId: subjectId }, raw: true})
    if(!subject)
        throw new ApiError(400, "Admin not found")
    await redisSetKey(`admin:user:${subject.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}
