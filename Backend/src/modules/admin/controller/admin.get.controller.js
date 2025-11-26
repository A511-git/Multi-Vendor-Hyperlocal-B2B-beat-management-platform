import {serviceGetAdmin, serviceGetAdmin, serviceGetAdmin} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const getAdmin = asyncHandler(async (req, res, next) => {
    const admin = await serviceGetAdmin(res.user)
    res.status(200).json(new ApiResponse(200, { admin} , "Admin fetched successfully"))
})

export const getAdminById = asyncHandler(async (req, res, next) => {
    const id = req.params.id || req.body.customerId 
    const admin = await serviceGetAdmin(id)
    res.status(200).json(new ApiResponse(200, { admin} , "Admin fetched successfully"))
})
