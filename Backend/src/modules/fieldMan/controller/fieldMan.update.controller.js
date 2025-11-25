import { asyncHandler } from "../../../utils/asyncHandler.js"
import {serviceUpdateFieldMan} from "../service/index.js"
import { ApiResponse } from "../../../utils/apiResponse.js"



export const updateFieldMan = asyncHandler(async (req, res, next) => {
    const fieldMan = await serviceUpdateFieldMan(req.params.id, req.body)
    res.status(200).json(new ApiResponse(200, { fieldMan} , "FieldMan updated successfully"))
})