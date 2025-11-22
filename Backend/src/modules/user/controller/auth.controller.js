import * as authService from "../service/auth.service.js"
import {asyncHandler} from "../../../utils/asyncHandler.js"
import { ApiError } from "../../../utils/apiError.js"
import { ApiResponse } from "../../../utils/apiResponse.js"
const register = asyncHandler(async (req,res) => {
    try {
        const response = await authService.register(req.body)
        res.status(201).json(new ApiResponse(201, response, "User created successfully"))
    } catch (error) {
        throw (error instanceof ApiError) ? error : new ApiError(500,"Something went wrong")
    }
})

const login = asyncHandler(async (req,res) => {
    try {
        const response = await authService.login(req.body)
        res.status(200).json(new ApiResponse(200, response, "Login successful"))
    } catch (error) {
        throw (error instanceof ApiError) ? error : new ApiError(500,"Something went wrong")
    }
})

export {register, login}