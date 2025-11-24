import {serviceDeleteVendor} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const deleteVendor = asyncHandler(async (req, res, next) => {
    const vendor = await serviceDeleteVendor(req.user)
    res.status(200).json(new ApiResponse(200, { vendor} , "Vendor deleted successfully"))
})