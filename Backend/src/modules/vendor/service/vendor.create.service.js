import { createVendorSchema } from "../schema/index.js"
import { serviceRegisterUser, generateAccessAndRefreshToken } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import {Vendor, User} from "../../index.model.js"


export const serviceCreateVendor = async (data, user) => {
    const parsed = createVendorSchema.safeParse({ ...data, userId: user.userId })
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId, shopName, address, city, pincode } = parsed.data;

    if(user.role === "vendor")
        throw new ApiError(400, "Vendor already exists")    

    const [existingVendor, fetchedUser] = await Promise.all([
        Vendor.findOne({ where: { userId } }),
        User.findByPk(userId)
    ])
    if (existingVendor)
        throw new ApiError(400, "Vendor already exists")

    const vendor = await Vendor.create({ userId, shopName, address, city, pincode })
    if (!vendor)
        throw new ApiError(500, "Vendor creation failed")
    user.role = "vendor"
    await fetchedUser.save()

    const safeVendor = vendor.get({ plain: true })

    await redisSetKey(`user:${user.userId}`, JSON.stringify(user), 60 * 15)
    await redisSetKey(`vendor:user:${user.userId}`, JSON.stringify(safeVendor), 60 * 15)

    return safeVendor
}

export const serviceRegisterVendor = async (data) => {
    
    const user = await serviceRegisterUser({ ...data, role: "vendor" })
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const vendor = await serviceCreateVendor(data)
    if (!vendor)
        throw new ApiError(500, "Vendor creation failed")
    return {
        user,
        vendor,
        accessToken,
        refreshToken
    }
}

