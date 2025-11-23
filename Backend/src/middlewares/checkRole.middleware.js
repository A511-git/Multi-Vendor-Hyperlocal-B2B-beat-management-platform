import { ApiError } from "../utils/apiError.js"


export const checkRole = (roles = []) => {
    return (req, res, next) => {
        if(! Array.isArray(roles))
            next(new ApiError(500,"Roles must be an array"));
        const userRole = req.user.role;
        if(!roles.includes(userRole))
            next(new ApiError(403,"Forbidden"));
        return next();            
    }
}