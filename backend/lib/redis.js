import { createClient } from "redis"
import dotenv from "dotenv"


dotenv.config();

const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL
});

redis.on("error", function(err) {
  throw err;
});

//key-value store

await redis.connect()
await redis.set('foo','bar');


export default redis;