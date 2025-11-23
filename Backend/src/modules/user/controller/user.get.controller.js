import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import {serviceGetUser, serviceGetUserById, serviceGetUsers} from "../service/index.js"


export const getUser = asyncHandler(async (req, res) => {
    const user = serviceGetUser(req.user);

    res.status(200).json(new ApiResponse(200, {user}, "User fetched successfully"))
})

export const getUserById = asyncHandler(async (req, res) => {
    const user = await serviceGetUserById(req.params.id);

    res.status(200).json(new ApiResponse(200, {user}, "User fetched successfully"))
})

export const getUsers = asyncHandler(async (req, res) => {
    const response = await serviceGetUsers(req.query);

    res.status(200).json(new ApiResponse(200, {response}, "Users fetched successfully"))
})