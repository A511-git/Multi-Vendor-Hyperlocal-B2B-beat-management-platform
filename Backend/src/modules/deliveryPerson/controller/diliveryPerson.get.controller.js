import {serviceGetDeliveryPerson, serviceGetDeliveryPersonById, serviceGetDeliveryPersons} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const getDeliveryPerson = asyncHandler(async (req, res, next) => {
    const diliveryPerson = await serviceGetDeliveryPerson(res.user)
    res.status(200).json(new ApiResponse(200, { diliveryPerson} , "Dilivery Person fetched successfully"))
})

export const getDeliveryPersonById = asyncHandler(async (req, res, next) => {
    const id = req.params.id || req.body.customerId 
    const diliveryPerson = await serviceGetDeliveryPersonById(id)
    res.status(200).json(new ApiResponse(200, { diliveryPerson} , "Dilivery Person fetched successfully"))
})

export const getDiliveryPersonsByQuery = asyncHandler(async (req, res, next) => {
    const response = await serviceGetDeliveryPersons(req.query);
    res.status(200).json(new ApiResponse(200, { response} , "Dilivery Person fetched successfully"))
})