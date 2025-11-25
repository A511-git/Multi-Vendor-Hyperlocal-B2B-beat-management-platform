import { createAdminSchema } from "../schema/index.js"
import { serviceRegisterUser, serviceGenerateAccessAndRefreshTokenUser } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import { Admin, User } from "../../index.model.js"


export const serviceCreateAdmin = async (user) => {
    const parsed = createAdminSchema.safeParse({userId: user.userId })
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId } = parsed.data;

    if (user.role === "admin")
        throw new ApiError(400, "Admin already exists")

    const [existingSubject, fetchedUser] = await Promise.all([
        Admin.findOne({ where: { userId } }),
        User.findByPk(userId)
    ])
    if (existingSubject)
        throw new ApiError(400, "Customer already exists")

    const subject = await Admin.create({ userId, address, city, pincode })
    if (!subject)
        throw new ApiError(500, "Admin creation failed")
    user.role = "admin"
    await fetchedUser.save()

    const safeSubject = subject.get({ plain: true })
    await redisSetKey(`admin:user:${user.userId}`, JSON.stringify(safeSubject), 60 * 15)

    return safeSubject
}

export const serviceRegisterAdmin = async (data) => {

    const user = await serviceRegisterUser(data)
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await serviceGenerateAccessAndRefreshTokenUser(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const subject = await serviceCreateAdmin(data)
    if (!subject)
        throw new ApiError(500, "Admin creation failed")
    return {
        user,
        admin: subject,
        accessToken,
        refreshToken
    }
}

