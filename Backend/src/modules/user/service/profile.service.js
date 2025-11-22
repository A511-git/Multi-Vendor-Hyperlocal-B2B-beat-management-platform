import { ApiError } from "../../../utils/apiError"
import { redisFindKey } from "../../../utils/redisHelper"
import { fromBinaryUUID } from "../../../utils/uuId&BinaryConvertor"


export const getUser = async (data) => {
    if(!data.userId.UUID())
        throw new ApiError(400,"Invalid UUID")

    const redisUser = await redisFindKey(`user:${data.userId}`)
    if(redisUser)
        return JSON.parse(user)

    const user = await User.findOne({
        where: {
            userId: fromBinaryUUID(data.userId)
        }
    })

    if(!user)
        throw new ApiError(404,"User not found")

    
    await redisSetKey(`user:${safeUser.userId}`, JSON.stringify(safeUser), 60 * 15);
    return safeUser


    
}