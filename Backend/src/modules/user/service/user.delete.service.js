import { redisDeleteKey} from "../../../utils/redisHelper.js";
import { User } from "../../index.model.js";



export const serviceDeleteUser = async (userId) => {
    const user = await User.findOne({ where: { userId } })
    if (!user)
        throw new ApiError(404, "User not found");

    await user.destroy();
    const safeUser = user.get({ plain: true });
    delete safeUser.password;
    delete safeUser.refreshToken;

    await redisDeleteKey(`user:${userId}`);

    return safeUser;

}