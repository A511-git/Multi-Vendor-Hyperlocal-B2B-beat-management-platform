import { ApiError } from "../../../utils/apiError"
import { redisGetKey, redisSetKey } from "../../../utils/redisHelper"
import {UUID} from "../../../utils/zodHelper.js"
import { getVendorsQuerySchema } from "../schema/index.js"
import { Op } from "sequelize"
import {Customer, Vendor} from "../../index.model.js"


export const serviceGetVendor = async (data) => {    
    if(!data)
        throw new ApiError(400, "User not found")
    const userId = data.userId
    const chachedVendor = await redisGetKey(`vendor:user:${userId}`)
    if(chachedVendor)
        return JSON.parse(chachedVendor)

    const vendor = await Vendor.findOne({ where: { userId }, raw: true})
    if(!vendor)
        throw new ApiError(400, "Vendor not found")
    await redisSetKey(`vendor:user:${userId}`, JSON.stringify(vendor), 60 * 15)
    return vendor
}

export const serviceGetVendorById = async (vendorId) => {
    if(!UUID.safeParse(vendorId).success)
        throw new ApiError(400, "Invalid vendor id")

    const vendor = await Vendor.findByPk(vendorId,{raw: true})
    if(!vendor)
        throw new ApiError(400, "Vendor not found")
    await redisSetKey(`vendor:user:${vendor.userId}`, JSON.stringify(vendor), 60 * 15)
    return vendor
}

export const serviceGetVendors = async (data,user) => {
    const parsed = getVendorsQuerySchema.safeParse(data)

    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }
    const { rating, search, offset, limit, sortBy, order } = parsed.data

    let subject = await redisGetKey(`${user.role}:user:${user.userId}`)
    if(!subject)
        if(user.role === "customer")
            subject = await Customer.findOne({ where: { userId: user.userId }, raw: true})
        else
            throw new ApiError(400, "Unauthorized")

    const filters = {
        city: subject.city,
        pincode: subject.pincode,
        status: "active",
        rating,
    }

    if(search)
        filters[Op.or] = [
            { shopName: { [Op.like]: `%${search}%` } },
        ]
    
    const {rows, count} = await Vendor.findAndCountAll({ where: {...filters}, offset, limit, order: [[sortBy, order]], raw: true})
    return {
        rows,
        pagination: {
            offset,
            limit,
            count,
        }
    }  
}