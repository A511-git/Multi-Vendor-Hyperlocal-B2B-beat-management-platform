import {serviceCreateCustomer, serviceRegisterCustomer} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"

export const createCustomer = asyncHandler(async (req, res, next) => {
    const customer = await serviceCreateCustomer(req.body, res.user)
    res.status(201).json(new ApiResponse(201, { customer} , "Customer created successfully"))
})

export const registerCustomer = asyncHandler(async (req, res, next) => {
    const {user, customer, accessToken, refreshToken} = await serviceRegisterCustomer(req.body)
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });
    res.status(201).json(new ApiResponse(201, { user, customer, accessToken} , "Customer registered successfully"))
})