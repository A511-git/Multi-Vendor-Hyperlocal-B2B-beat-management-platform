import { ApiError } from "./apiError.js";

export const redisFindKey = async (key) => {
        if (!key)
            throw new ApiError(400, "Key is required")

        const data = await redis.get(key.trim());
        return data;
}

export const redisSetKey = async (key, value, ttl) => {
        if (!key)
            throw new ApiError(400, "Key is required")
        if (!value)
            throw new ApiError(400, "Value is required")
        if (ttl)
            await redis.set(key.trim(), value, { EX: ttl });
        else
        await redis.set(key.trim(), value);
}

export const redisDeleteKey = async (key) => {
        if (!key)
            throw new ApiError(400, "Key is required")

        await redis.del(key.trim());
}