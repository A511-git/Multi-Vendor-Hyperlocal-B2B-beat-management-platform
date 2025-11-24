import {serviceCreateVendor, serviceRegisterVendor} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"

export const createVendor = asyncHandler(async (req, res, next) => {
    const vendor = await serviceCreateVendor(req.body, res.user)
    res.status(201).json(new ApiResponse(201, { vendor} , "Vendor created successfully"))
})

export const registerVendor = asyncHandler(async (req, res, next) => {
    const {user, vendor, accessToken, refreshToken} = await serviceRegisterVendor(req.body)
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });
    res.status(201).json(new ApiResponse(201, { user, vendor, accessToken} , "Vendor registered successfully"))
})