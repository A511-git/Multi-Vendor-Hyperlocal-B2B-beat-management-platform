import { ApiError } from "../../../utils/apiError.js";
import { User } from "../../index.model.js";
import { createUserSchema } from "../schema/index.js";
import { redisSetKey } from "../../../utils/redisHelper.js";
import { loginUserSchema } from "../schema/index.js";
import { raw } from "express";


export const generateAccessAndRefreshToken = async (user) => {
    if (!user)
        throw new ApiError(404, "User not found");

    const fetchUser = await User.findOne({ where: { userId: user.userId } },{raw:true})
    if (!fetchUser)
        throw new ApiError(404, "User not found");

    const accessToken = fetchUser.generateAccessToken();
    const refreshToken = fetchUser.generateRefreshToken();
    if (!accessToken || !refreshToken)
        throw new ApiError(401, "Token generation failed");

    fetchUser.refreshToken = refreshToken;
    await fetchUser.save();

    return {
        accessToken,
        refreshToken
    }
}

export const register = async (data) => {
    const parsed = createUserSchema.safeParse(data);
    if (!parsed.success) {
        const message = parsed.error?.issues?.[0]?.message || "Invalid Data"
        throw new ApiError(400, message)
    }
    const { email, firstName, lastName, password } = parsed.data;

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
        throw new ApiError(400, "User already exists");

    const user = await User.create({
        email,
        firstName,
        lastName,
        password,
    })

    if (!user)
        throw new ApiError(500, "Something went wrong");

    let safeUser = user.get({ plain: true });
    delete safeUser.password;
    delete safeUser.refreshToken;

    return safeUser
}

export const login = async (data) => {
    const parsed = loginUserSchema.safeParse(data);
    if (!parsed.success) {
        const message = parsed.error?.issues?.[0]?.message || "Invalid Data";
        throw new ApiError(400, message)
    }
    const { email, password } = parsed.data;

    const user = await User.scope("withSecret").findOne({ where: { email } })
    if (!user)
        throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new ApiError(400, "Invalid credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    let safeUser = user.get({ plain: true });
    delete safeUser.password;
    delete safeUser.refreshToken;

    await redisSetKey(`user:${safeUser.userId}`, JSON.stringify(safeUser), 60 * 15);

    return {
        user: safeUser,
        accessToken,
        refreshToken
    }
}
