import { createVendorSchema } from "../schema/index.js"
import { register, generateAccessAndRefreshToken } from "../../user/service/user.auth.service.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"


export const createVendor = async (data) => {
    const parsed = createVendorSchema.safeParse(data)
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { userId, shopName, address, city, pincode } = parsed.data;

    const existingVendor = await Vendor.findOne({ where: { userId } })
    if (existingVendor)
        throw new ApiError(400, "Vendor already exists")

    const vendor = await Vendor.create({ userId, shopName, address, city, pincode })
    if (!vendor)
        throw new ApiError(500, "Vendor creation failed")

    const safeVendor = vendor.get({ plain: true })
    await redisSetKey(`vendor:${safeVendor.id}`, JSON.stringify(safeVendor), 60 * 15)

    return safeVendor
}

export const registerVendor = async (data) => {
    const user = await register(data)
    if (!user)
        throw new ApiError(500, "User registration failed")
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user)
    if (!accessToken || !refreshToken)
        throw new ApiError(500, "Token generation failed")

    data.userId = user.userId
    const vendor = await createVendor({ userId: user.userId })
    return {
        user,
        vendor,
        accessToken,
        refreshToken
    }
}

