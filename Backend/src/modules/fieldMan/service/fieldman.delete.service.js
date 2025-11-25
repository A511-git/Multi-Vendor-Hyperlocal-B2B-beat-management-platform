import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"
import {UUID} from "../../../utils/zodHelper.js"
import {FieldMan} from "../../index.model.js"

export const serviceDeleteFieldMan = async (user) => {
    if(!UUID.safeParse(user.userId).success)
        throw new ApiError(400, "Invalid id")

    const  subject = await FieldMan.findOne({ where: { userId: user.userId } })
    if(!subject)
        throw new ApiError(400, "FieldMan not found")

    const safeSubject = subject.get({ plain: true })
    await subject.destroy()
    redisDeleteKey(`fieldMan:user:${user.userId}`)
    return safeSubject
}