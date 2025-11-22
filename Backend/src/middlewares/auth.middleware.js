import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { redisFindKey } from "../utils/redisHelper.js";
import { User } from './index.model.js'



export const authenticate = asyncHandler(async (req, res, next) => {
    const encodedAccessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!encodedAccessToken) throw new ApiError(401, "Unauthorized access 1");


    let decodedAccessToken = jwt.verify(encodedAccessToken, process.env.JWT_SECRET);
    const userId = decodedAccessToken.userId

    let data = await redisFindKey(`user:${userId}`);
    if (data) {
        req.user = JSON.parse(data);
        next();    }
    else {
        data = await User.findByPk(userId, { raw: true });
        if (!data) throw new ApiError(401, "Unauthorized access");
        req.user = data;
        next();
    }
})