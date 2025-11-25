import {serviceGetCustomer, serviceGetCustomerById, serviceGetCustomers} from "../service/index.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import { ApiResponse } from "../../../utils/apiResponse.js"


export const getCustomer = asyncHandler(async (req, res, next) => {
    const vendors = await serviceGetCustomer(res.user)
    res.status(200).json(new ApiResponse(200, { vendors} , "Customer fetched successfully"))
})

export const getCustomerById = asyncHandler(async (req, res, next) => {
    const id = req.params.id || req.body.customerId 
    const vendor = await serviceGetCustomerById(id)
    res.status(200).json(new ApiResponse(200, { vendor} , "Customer fetched successfully"))
})

export const getCustomerByQuery = asyncHandler(async (req, res, next) => {
    const response = await serviceGetCustomers(req.query);
    res.status(200).json(new ApiResponse(200, { response} , "Customers fetched successfully"))
})