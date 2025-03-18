// import { Redis } from "ioredis";
// require("dotenv").config();

// const redisClient = () => {
//   if (process.env.REDIS_URL) {
//     console.log("Redis is connected");
//     return process.env.REDIS_URL;
//   }
//   throw new Error("Redis is connection failed");
// };
// export const redis = new Redis(redisClient());

import { Redis } from "ioredis";

const redis = new Redis(
  "rediss://default:AUY-AAIjcDE4MmRmZGY5YTEzMzU0ZDNmOGQ2MDI2NTkyOTcxYmZjNXAxMA@regular-arachnid-17982.upstash.io:6379"
);

async function testConnection() {
  try {
    console.log("✅ Redis is working");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
}

testConnection();

export { redis };
