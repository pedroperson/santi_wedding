import { createClient } from "redis";

// Load environment variables from .env.development.local if it exists
if (process.env.NODE_ENV === "development") {
  try {
    require("dotenv").config({ path: ".env.development.local" });
  } catch (e) {
    // dotenv not available or file doesn't exist, continue with process.env
  }
}

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL,
});

// Connect to Redis
redis.on("error", (err) => console.error("Redis Client Error", err));
redis.on("connect", () => console.log("Connected to Redis"));

// Connect if not already connected (this will be handled in each function call)

// Create a wrapper that matches the Upstash Redis API
export const redisWrapper = {
  async hset(key, field, value) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    if (typeof field === "object") {
      // Handle object input like Upstash
      return await redis.hSet(key, field);
    }
    return await redis.hSet(key, field, value);
  },

  async hgetall(key) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    return await redis.hGetAll(key);
  },

  async sadd(key, ...members) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    return await redis.sAdd(key, members);
  },

  async smembers(key) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    return await redis.sMembers(key);
  },
};

export { redisWrapper as redis };
