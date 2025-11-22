import { Redis } from "ioredis";

export const redis = new Redis(
    {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    }
);



export const connectRedis = async () => {
    return new Promise((resolve, reject) => {
        redis.on("connect", () => {
            console.log("Redis connected successfully.");
            resolve();
        });

        redis.on("error", (err) => {
            console.error("Redis connection failed:", err);
            reject(err);
        });
    });
};
