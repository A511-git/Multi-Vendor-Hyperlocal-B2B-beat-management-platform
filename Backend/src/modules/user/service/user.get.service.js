import { ApiError } from "../../../utils/apiError.js"
import { User } from "../../index.model.js"
import { UUID } from "../../../utils/zodHelper.js"
import { redisFindKey, redisSetKey } from "../../../utils/redisHelper.js"
import { getUsersQuerySchema } from "../schema/index.js"
import { Op } from "sequelize"

export const serviceGetUser = async (user) => {
    if (!user instanceof User)
        throw new ApiError("Invalid user object")

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

    return dbUser
}

export const serviceGetUsers = async ({
    role,
    status,
    search,
    offset = 0,
    limit = 20,
    sortBy = "createdAt",
    order = "DESC"
}) => {
    const data = {
        role,
        status,
        search,
        offset,
        limit,
        sortBy,
        order
    }
    const parsed = getUsersQuerySchema.safeParse(data);
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    role= parsed.data.role;
    status= parsed.data.status;
    search= parsed.data.search;
    offset= parsed.data.offset;
    limit= parsed.data.limit;
    sortBy= parsed.data.sortBy;
    order= parsed.data.order;


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
            pages: Math.ceil(result.count / limit)
        }
    }
}


