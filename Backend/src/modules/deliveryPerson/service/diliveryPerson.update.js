import { redisSetKey } from "../../../utils/redisHelper.js"
import {ApiError} from "../../../utils/apiError.js"
import {updateDeliveryPersonSchema} from "../schema/index.js"
import {DeliveryPerson} from "../../index.model.js"

export const serviceUpdateDeliveryPerson = async (data, user) => {

    const parsed = updateDeliveryPersonSchema.safeParse(data)
    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const {address, city, pincode, phone } = parsed.data;

    const data = {}
    if(address)
        data.address = address
    if(city)
        data.city = city
    if(pincode)
        data.pincode = pincode
    if(phone)
        data.phone = phone

    const subject = await DeliveryPerson.update({ ...data }, { where: { userId: user.userId }, raw: true})
    
    await redisSetKey(`deliveryPerson:user:${user.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}