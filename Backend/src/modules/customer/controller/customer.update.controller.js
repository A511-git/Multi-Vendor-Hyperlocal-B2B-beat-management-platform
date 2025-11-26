import { asyncHandler } from "../../../utils/asyncHandler.js"
import {serviceUpdateVendor} from "../service/index.js"
import { ApiResponse } from "../../../utils/apiResponse.js"



export const updateCustomer = asyncHandler(async (req, res, next) => {
    const vendor = await serviceUpdateVendor(req.params.id, req.body)
    res.status(200).json(new ApiResponse(200, { vendor} , "Vendor updated successfully"))
})