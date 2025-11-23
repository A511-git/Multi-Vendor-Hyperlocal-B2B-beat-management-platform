import { ApiError } from "../../../utils/apiError.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import * as userService from "../service/profile.service.js"


export const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user)
        throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, {user}, "User fetched successfully"))
})

export const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.body, req.user.userId);

    if (!user)
        throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, {user}, "User updated successfully"))
})

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.user.userId);

    if (!user)
        throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, {user}, "User deleted successfully"))
})