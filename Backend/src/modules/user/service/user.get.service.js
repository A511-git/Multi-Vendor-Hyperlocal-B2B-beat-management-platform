import { ApiError } from "../../../utils/apiError.js"
import { User } from "../../index.model.js"
import { UUID } from "../../../utils/zodHelper.js"
import { redisFindKey, redisSetKey } from "../../../utils/redisHelper.js"

export const serviceGetUser = async (user) => {
    return user
}

export const serviceGetUserById = async (userId) => {

    if (!userId)
        throw new ApiError("Invalid user id")

    if (!UUID.safeParse(userId).success)
        throw new ApiError("Invalid user id")

    const cachedUser = await redisFindKey(`user:${userId}`)
    if (cachedUser)
        return JSON.parse(cachedUser)

    const dbUser = await User.findOne({ where: { userId } }, { raw: true })
    if (!dbUser)
        throw new ApiError("User not found")

    await redisSetKey(`user:${userId}`, JSON.stringify(dbUser), 60 * 15)

    return dbUser
}



