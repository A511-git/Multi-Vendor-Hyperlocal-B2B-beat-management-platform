import {serviceCreateFieldMan, serviceRegisterFieldMan} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"

export const createFieldMan = asyncHandler(async (req, res, next) => {
    const fieldMan = await serviceCreateFieldMan(req.body, res.user)
    res.status(201).json(new ApiResponse(201, { fieldMan} , "FieldMan created successfully"))
})

export const registerFieldMan = asyncHandler(async (req, res, next) => {
    const {user, fieldMan, accessToken, refreshToken} = await serviceRegisterFieldMan(req.body)
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });
    res.status(201).json(new ApiResponse(201, { user, fieldMan, accessToken} , "FieldMan registered successfully"))
})