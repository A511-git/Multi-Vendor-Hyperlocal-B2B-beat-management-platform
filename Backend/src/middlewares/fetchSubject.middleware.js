import { Customer, Vendor, Admin, FeildMan, DiliveryPerson } from "../modules/index.model.js"
import { ApiError } from "../utils/apiError";

export const fetchSubject = async (req, res, next) => {
    const role = req.user.role
    let subject;
    if (role === "customer") {
        subject = await Customer.findOne({ where: { userId: req.user.userId }})
        if (!subject)
            throw new ApiError(400, "Customer not found")
    }
    else if (role === "vendor"){
        subject = await Vendor.findOne({ where: { userId: req.user.userId }})
        if (!subject)
            throw new ApiError(400, "Vendor not found")
    }
    else if (role === "admin"){
        subject = await Admin.findOne({ where: { userId: req.user.userId }})
        if (!subject)
            throw new ApiError(400, "Admin not found")
    }
    else if (role === "feildMan"){
        subject = await FeildMan.findOne({ where: { userId: req.user.userId }})
        if (!subject)
            throw new ApiError(400, "Feild Man not found")
    }
    else if (role === "deliveryPerson"){
        subject = await DiliveryPerson.findOne({ where: { userId: req.user.userId }})
        if (!subject)
            throw new ApiError(400, "Delivery Person not found")
    }
    else
        throw new ApiError(400, "Invalid role")
    req.subject = subject
    next()
}