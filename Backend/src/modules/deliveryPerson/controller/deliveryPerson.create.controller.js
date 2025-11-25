import {serviceCreateDiliveryPerson, serviceRegisterDiliveryPerson} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"

export const createDeliveryPerson = asyncHandler(async (req, res, next) => {
    const diliveryPerson = await serviceCreateDiliveryPerson(req.body, res.user)
    res.status(201).json(new ApiResponse(201, { diliveryPerson} , "Dilivery Person created successfully"))
})

export const registerDeliveryPerson = asyncHandler(async (req, res, next) => {
    const {user, diliveryPerson, accessToken, refreshToken} = await serviceRegisterDiliveryPerson(req.body)
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });
    res.status(201).json(new ApiResponse(201, { user, diliveryPerson, accessToken} , "Dilivery Person registered successfully"))
})