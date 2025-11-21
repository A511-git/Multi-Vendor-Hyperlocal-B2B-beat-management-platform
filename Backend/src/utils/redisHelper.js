import { ApiError } from "./apiError";

export const redisFindKey = async (key) => {
        if (!key)
            throw new ApiError(400, "Key is required")

        const data = await redis.get(key);
        return data;
}

export const redisSetKey = async (key, value, ttl) => {
        if (!key)
            throw new ApiError(400, "Key is required")
        if (!value)
            throw new ApiError(400, "Value is required")
        if (ttl)
            await redis.set(key, value, { EX: ttl });
        else
        await redis.set(key, value);
}

export const redisDeleteKey = async (key) => {
        if (!key)
            throw new ApiError(400, "Key is required")

        await redis.del(key);
}