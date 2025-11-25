import {serviceDeleteCustomer} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const deleteCustomer = asyncHandler(async (req, res, next) => {
    const subject = await serviceDeleteCustomer(req.user)
    res.status(200).json(new ApiResponse(200, { customer: subject } , "Customer deleted successfully"))
})