import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { redisFindKey } from "../utils/redisHelper.js";
import { User } from '../modules/index.model.js'



export const verifyJWT = asyncHandler(async (req, res, next) => {
    const encodedAccessToken =
        req.header("authorization")?.replace("Bearer ", "");

    if (!encodedAccessToken) throw new ApiError(401, "Acess token missing or invalid");


    let decodedAccessToken = jwt.verify(encodedAccessToken, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedAccessToken.userId

    console.log("VERIFY MIDDLEWARE HIT");
    console.log("AUTH HEADER RECEIVED:", req.headers.authorization);

    let data = await redisFindKey(`user:${userId}`);
    if (data) {
        req.user = JSON.parse(data);
        next();
    }
    else {
        data = await User.findByPk(userId, { raw: true });
        if (!data) throw new ApiError(401, "Unauthorized access");
        req.user = data;
        next();
    }
})