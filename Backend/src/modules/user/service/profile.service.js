import { redisSetKey } from "../../../utils/redisHelper.js";
import { User } from "../../index.model.js";
import { updateUserSchema } from "../schema/index.js"



export const updateUser = async (data, userId) => {
    const parsed = updateUserSchema.safeParse(data);
    if (!parsed.success) {
        const message = parsed.error?.issues?.[0]?.message || "Invalid Data"
        throw new ApiError(400, message)
    }
    const { email, firstName, lastName, password } = parsed.data;

    if (email) {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser)
            throw new ApiError(400, "User already exists");
    }

    const user = await User.findOne({ where: { userId } })
    if (!user)
        throw new ApiError(404, "User not found");

    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.password = password || user.password;

    await user.save();

    let safeUser = user.get({ plain: true });
    delete safeUser.password;
    delete safeUser.refreshToken;

    redisSetKey(`user:${safeUser.userId}`, JSON.stringify(safeUser), 60 * 15);

    return safeUser    
}

export const deleteUser = async (userId) => {
    const user = await User.findOne({ where: { userId } })
    if (!user)
        throw new ApiError(404, "User not found");

    await user.destroy();

    return user;

}