import {serviceRegisterUser, serviceLoginUser, serviceGenerateAccessAndRefreshTokenUser}  from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const register = asyncHandler(async (req, res) => {
    const response = await serviceRegisterUser(req.body)
    res.status(201).json(new ApiResponse(201, {response}, "User created successfully"))
})

export const login = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await serviceLoginUser(req.body)

    const response = {
        user,
        accessToken
    }


    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    });

    res.status(200).json(new ApiResponse(200, response, "Login successful"))
})


export const refreshToken = asyncHandler(async (req, res) => {
    const {accessToken, refreshToken} = await serviceGenerateAccessAndRefreshTokenUser(req.user);

    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token",
        maxAge: 15 * 24 * 60 * 60 * 1000  // 10 days
    })
    res.status(200).json(new ApiResponse(200, {accessToken}, "Token refreshed successfully"))

})

export const logout = asyncHandler(async (req, res) => {

    res.set("Authorization", "");
    res.set("Access-Control-Expose-Headers", "Authorization");

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/user/refresh-token"
    });

    res.status(200).json(new ApiResponse(200, {}, "Logout successful"))

})

