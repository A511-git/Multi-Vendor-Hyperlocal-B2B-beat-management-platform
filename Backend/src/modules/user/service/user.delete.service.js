import { redisDeleteKey} from "../../../utils/redisHelper.js";
import { User } from "../../index.model.js";



export const serviceDeleteUser = async (userId) => {
    const user = await User.findOne({ where: { userId } })
    if (!user)
        throw new ApiError(404, "User not found");

    await user.destroy();
    await redisDeleteKey(`user:${userId}`);

    return user;

}