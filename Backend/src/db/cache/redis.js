import { Redis } from "ioredis";


export const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})

export const checkRedisConnection = () => {
    redis.on("connect", () => console.log("Redis connected"));
    redis.on("error", (err) => console.error("Redis error:", err));
}