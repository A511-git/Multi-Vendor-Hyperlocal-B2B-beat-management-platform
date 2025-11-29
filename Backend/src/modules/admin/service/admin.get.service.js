import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import {Admin} from "../../index.model.js"

export const serviceGetAdmin = async (admin) => {
    if(!admin)
        throw new ApiError(400, "Admin not found")
    const response = await admin.get({ plain: true })
    return response
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
