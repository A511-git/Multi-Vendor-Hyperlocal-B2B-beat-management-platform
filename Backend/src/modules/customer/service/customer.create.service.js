import { createCustomerSchema } from "../schema/index.js"
import { register, generateAccessAndRefreshToken } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import { Customer, User } from "../../index.model.js"


export const serviceCreateCustomer = async (data, user) => {
    const parsed = createCustomerSchema.safeParse({ ...data, userId: user.userId })
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId, address, city, pincode } = parsed.data;

    if (user.role === "customer")
        throw new ApiError(400, "Customer already exists")

    const [existingSubject, fetchedUser] = await Promise.all([
        Customer.findOne({ where: { userId } }),
        User.findByPk(userId)
    ])
    if (existingSubject)
        throw new ApiError(400, "Customer already exists")

    const subject = await Customer.create({ userId, address, city, pincode })
    if (!subject)
        throw new ApiError(500, "Customer creation failed")
    user.role = "customer"
    await fetchedUser.save()

    const safeSubject = Customer.get({ plain: true })
    await redisSetKey(`customer:user:${user.userId}`, JSON.stringify(safeSubject), 60 * 15)

    return safeSubject
}

export const serviceRegisterCustomer = async (data) => {

    const user = await register(data)
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const subject = await serviceCreateCustomer(data)
    if (!subject)
        throw new ApiError(500, "Customer creation failed")
    return {
        user,
        customer: subject,
        accessToken,
        refreshToken
    }
}

