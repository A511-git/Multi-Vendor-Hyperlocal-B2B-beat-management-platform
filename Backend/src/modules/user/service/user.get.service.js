import { ApiError } from "../../../utils/apiError.js"
import { User } from "../../index.model.js"
import { UUID } from "../../../utils/zodHelper.js"
import { redisFindKey, redisSetKey } from "../../../utils/redisHelper.js"
import { getUsersQuerySchema } from "../schema/index.js"
import { Op } from "sequelize"

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

export const serviceGetUsers = async (data) => {
    const parsed = getUsersQuerySchema.safeParse(data);
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }
    const { role, status, search, offset, limit, sortBy, order } = parsed.data;

    let filters = {};
    if (role)
        filters.role = role;
    if (status)
        filters.status = status;
    if (search)
        filters[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
        ]


    const result = await User.findAndCountAll({
        where: { ...filters },
        offset,
        limit,
        order: [[sortBy, order]],
        raw: true,
        nest: true
    })

    return {
        data: result.rows,
        pagination: {
            total: result.count,
            offset,
            limit,
            totalPages: Math.ceil(result.count / limit),
            currentPage: Math.ceil(offset / limit) + 1

        }
    }
}


