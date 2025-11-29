import { redisSetKey } from "../../../utils/redisHelper.js"
import {ApiError} from "../../../utils/apiError.js"
import {updateFieldManSchema} from "../schema/index.js"
import {FieldMan} from "../../index.model.js"

export const serviceUpdateFieldMan = async (data, user) => {

    const parsed = updateFieldManSchema.safeParse(data)
    if(!parsed.success){
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const {address, city, pincode, phone} = parsed.data;

    const data = {}
    if(address)
        data.address = address
    if(city)
        data.city = city
    if(pincode)
        data.pincode = pincode
    if(phone)
        data.phone = phone
    
    const subject = await FieldMan.update({ ...data }, { where: { userId: user.userId }, raw: true})
    
    await redisSetKey(`fieldMan:user:${user.userId}`, JSON.stringify(subject), 60 * 15)
    return subject
}