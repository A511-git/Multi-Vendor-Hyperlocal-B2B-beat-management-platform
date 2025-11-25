import { createDeliveryPersonSchema } from "../schema/index.js"
import { serviceRegisterUser, serviceGenerateAccessAndRefreshTokenUser } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import { DeliveryPerson, User } from "../../index.model.js"


export const serviceCreateDeliveryPerson = async (data, user) => {
    const parsed = createDeliveryPersonSchema.safeParse({ ...data, userId: user.userId })
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId, address, city, pincode } = parsed.data;

    if (user.role === "deliveryPerson")
        throw new ApiError(400, "Delivery Person already exists")

    const [existingSubject, fetchedUser] = await Promise.all([
        DeliveryPerson.findOne({ where: { userId } }),
        User.findByPk(userId)
    ])
    if (existingSubject)
        throw new ApiError(400, "Delivery Person already exists")

    const subject = await DeliveryPerson.create({ userId, address, city, pincode })
    if (!subject)
        throw new ApiError(500, "Delivery Person creation failed")
    user.role = "deliveryPerson"
    await fetchedUser.save()

    const safeSubject = subject.get({ plain: true })
    await redisSetKey(`deliveryPerson:user:${user.userId}`, JSON.stringify(safeSubject), 60 * 15)

    return safeSubject
}

export const serviceRegisterDeliveryPerson = async (data) => {

    const user = await serviceRegisterUser(data)
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await serviceGenerateAccessAndRefreshTokenUser(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const subject = await serviceCreateDeliveryPerson(data)
    if (!subject)
        throw new ApiError(500, "Delivery Person creation failed")
    return {
        user,
        deliveryPerson: subject,
        accessToken,
        refreshToken
    }
}

