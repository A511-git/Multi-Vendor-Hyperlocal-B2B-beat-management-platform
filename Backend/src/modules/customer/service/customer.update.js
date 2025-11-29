import { redisSetKey } from "../../../utils/redisHelper.js"
import {ApiError} from "../../../utils/apiError.js"
import {updateCustomerSchema} from "../schema/index.js"
import {Customer} from "../../index.model.js"

export const serviceUpdateCustomer = async (data, user) => {

    const parsed = updateCustomerSchema.safeParse(data)
    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const {address, city, pincode } = parsed.data;

    const data = {}
    if(address)
        data.address = address
    if(city)
        data.city = city
    if(pincode)
        data.pincode = pincode


    const subject = await Customer.update({ ...data }, { where: { userId: user.userId }, raw: true})
    
    await redisSetKey(`customer:user:${user.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}