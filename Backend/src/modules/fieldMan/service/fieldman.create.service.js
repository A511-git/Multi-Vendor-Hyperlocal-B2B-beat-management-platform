import { createFieldManSchema } from "../schema/index.js"
import { serviceRegisterUser, serviceGenerateAccessAndRefreshTokenUser } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import {FieldMan, User } from "../../index.model.js"


export const serviceCreateFieldMan = async (data, user) => {
    const parsed = createFieldManSchema.safeParse({ ...data, userId: user.userId })
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId, address, city, pincode, phone } = parsed.data;

    if (user.role === "fieldMan")
        throw new ApiError(400, "FieldMan already exists")

    const [existingSubject, fetchedUser] = await Promise.all([
        FieldMan.findOne({ where: { userId } }),
        User.findByPk(userId)
    ])
    if (existingSubject)
        throw new ApiError(400, "FieldMan already exists")

    const subject = await FieldMan.create({ userId, address, city, pincode, phone})
    if (!subject)
        throw new ApiError(500, "FieldMan creation failed")
    user.role = "fieldMan"
    await fetchedUser.save()

    const safeSubject = subject.get({ plain: true })
    await redisSetKey(`fieldMan:user:${user.userId}`, JSON.stringify(safeSubject), 60 * 15)

    return safeSubject
}

export const serviceRegisterFieldMan = async (data) => {

    const user = await serviceRegisterUser(data)
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await serviceGenerateAccessAndRefreshTokenUser(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const subject = await serviceCreateFieldMan(data)
    if (!subject)
        throw new ApiError(500, "FieldMan creation failed")
    return {
        user,
        fieldMan: subject,
        accessToken,
        refreshToken
    }
}

