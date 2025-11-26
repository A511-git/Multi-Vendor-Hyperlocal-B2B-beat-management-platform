import {Customer, Vendor, Admin, FeildMan, DiliveryPerson} from "../modules/index.model.js"
import { ApiError } from "../utils/apiError";

export const fetchSubject = async (req, res, next) => {
    const role = req.user.role
    let subject;
    if(role === "customer")
        subject = await Customer.findOne({ where: { userId: req.user.userId }})
    else if(role === "vendor")
        subject = await Vendor.findOne({ where: { userId: req.user.userId }})
    else if(role === "admin")
        subject = await Admin.findOne({ where: { userId: req.user.userId }})
    else if(role === "feildMan")
        subject = await FeildMan.findOne({ where: { userId: req.user.userId }})
    else if(role === "diliveryPerson")
        subject = await DiliveryPerson.findOne({ where: { userId: req.user.userId }})
    else
        throw new ApiError(400, "Invalid role")

    const safeSubject = subject.get({ plain: true })
    req.subject = safeSubject
    next()    
}