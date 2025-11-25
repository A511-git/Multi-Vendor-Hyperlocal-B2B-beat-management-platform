import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"
import {UUID} from "../../../utils/zodHelper.js"
import {DeliveryPerson} from "../../index.model.js"

export const serviceDeleteDeliveryPerson = async (user) => {
    if(!UUID.safeParse(user.userId).success)
        throw new ApiError(400, "Invalid id")

    const  subject = await DeliveryPerson.findOne({ where: { userId: user.userId } })
    if(!subject)
        throw new ApiError(400, "Delivery Person not found")

    const safeSubject = subject.get({ plain: true })
    await subject.destroy()
    redisDeleteKey(`deliveryPerson:user:${user.userId}`)
    return safeSubject
}