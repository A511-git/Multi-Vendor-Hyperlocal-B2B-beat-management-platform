import {serviceDeleteDeliveryPerson} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const deleteDiliveryPerson = asyncHandler(async (req, res, next) => {
    const subject = await serviceDeleteDeliveryPerson(req.user)
    res.status(200).json(new ApiResponse(200, { diliveryPerson: subject } , "Dilivery Person deleted successfully"))
})