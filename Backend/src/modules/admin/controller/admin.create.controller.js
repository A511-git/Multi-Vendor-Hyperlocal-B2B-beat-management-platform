import {serviceCreateAdmin, serviceRegisterAdmin} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"

export const createAdmin = asyncHandler(async (req, res, next) => {
    const admin = await serviceCreateAdmin(req.body, res.user)
    res.status(201).json(new ApiResponse(201, { admin} , "Admin created successfully"))
})

export const registerAdmin = asyncHandler(async (req, res, next) => {
    const {user, admin, accessToken, refreshToken} = await serviceRegisterAdmin(req.body)
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });
    res.status(201).json(new ApiResponse(201, { user, admin, accessToken} , "Admin registered successfully"))
})