import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"
import {Vendor} from "../../index.controller.js"

export const serviceDeleteVendor = async (user) => {

    const  vendor = await Vendor.findOne({ where: { userId: user.userId } })
    if(!vendor)
        throw new ApiError(400, "Vendor not found")
    const safeVendor = vendor.get({ plain: true })
    await vendor.destroy()
    redisDeleteKey(`vendor:user:${user.userId}`)
    return safeVendor
}