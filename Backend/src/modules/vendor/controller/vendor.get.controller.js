import {serviceGetVendor, serviceGetVendorById, serviceGetVendors} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const getVendor = asyncHandler(async (req, res, next) => {
    const vendors = await serviceGetVendor(res.user)
    res.status(200).json(new ApiResponse(200, { vendors} , "Vendor fetched successfully"))
})

export const getVendorById = asyncHandler(async (req, res, next) => {
    const id = req.params.id || req.body.vendorId || req.body.id
    const vendor = await serviceGetVendorById(id)
    res.status(200).json(new ApiResponse(200, { vendor} , "Vendor fetched successfully"))
})

export const getVendorByQuery = asyncHandler(async (req, res, next) => {
    const response = await serviceGetVendors(req.query);
    res.status(200).json(new ApiResponse(200, { response} , "Vendors fetched successfully"))
})
