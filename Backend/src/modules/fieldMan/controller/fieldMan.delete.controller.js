import {serviceDeleteFieldMan} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const deleteFieldMan = asyncHandler(async (req, res, next) => {
    const subject = await serviceDeleteFieldMan(req.user)
    res.status(200).json(new ApiResponse(200, {fieldMan: subject } , "FieldMan deleted successfully"))
})