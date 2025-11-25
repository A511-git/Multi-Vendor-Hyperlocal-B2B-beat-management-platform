import {serviceGetFieldMan, serviceGetFieldManById, serviceGetFieldMen} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const getFieldMan = asyncHandler(async (req, res, next) => {
    const fieldMan = await serviceGetFieldMan(res.user)
    res.status(200).json(new ApiResponse(200, { fieldMan} , "FieldMan fetched successfully"))
})

export const getFieldManById = asyncHandler(async (req, res, next) => {
    const id = req.params.id || req.body.customerId 
    const fieldMan = await serviceGetFieldManById(id)
    res.status(200).json(new ApiResponse(200, { fieldMan} , "FieldMan fetched successfully"))
})

export const getFieldMenByQuery = asyncHandler(async (req, res, next) => {
    const response = await serviceGetFieldMen(req.query);
    res.status(200).json(new ApiResponse(200, { response } , "FieldMen fetched successfully"))
})