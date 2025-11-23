import { ApiError } from "../../../utils/apiError.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import {serviceDeleteUser} from "../service/index.js"


export const deleteUser = asyncHandler(async (req, res) => {
    const user = await serviceDeleteUser(req.user.userId);

    if (!user)
        throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, {user}, "User deleted successfully"))
})