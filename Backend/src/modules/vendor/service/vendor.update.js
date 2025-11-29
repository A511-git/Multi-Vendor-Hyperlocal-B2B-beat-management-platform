import { redisSetKey } from "../../../utils/redisHelper.js"
import {BASEACTIVESTATUS} from "../../../utils/zodHelper.js"
import {Vendor} from "../../index.model.js"

export const serviceUpdateVendor = async (data, user) => {
    const parsed = BASEACTIVESTATUS.safeParse(data)
    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }
    const {status} = parsed.data

    const vendor = await Vendor.findOne({ where: { userId: user.userId } })
    if(!vendor)
        throw new ApiError(400, "Vendor not found")
    vendor.status = status
    await vendor.save()
    const safeVendor = vendor.get({ plain: true })
    
    await redisSetKey(`vendor:user:${user.userId}`, JSON.stringify(safeVendor), 60 * 15)
    return safeVendor
}