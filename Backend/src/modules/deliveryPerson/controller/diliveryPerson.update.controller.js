import { asyncHandler } from "../../../utils/asyncHandler.js"
import {serviceUpdateDeliveryPerson} from "../service/index.js"
import { ApiResponse } from "../../../utils/apiResponse.js"



export const updateDeliveryPerson = asyncHandler(async (req, res, next) => {
    const deliveryPerson = await serviceUpdateDeliveryPerson(req.params.id, req.body)
    res.status(200).json(new ApiResponse(200, { deliveryPerson} , "Vendor updated successfully"))
})