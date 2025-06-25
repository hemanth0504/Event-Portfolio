import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

redis.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

export const connectRedis = async () => {
  await redis.connect();
  console.log("✅ Connected to Redis (Upstash)");
};

export default redis;
