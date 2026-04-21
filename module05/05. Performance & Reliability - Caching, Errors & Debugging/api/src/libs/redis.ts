import { Redis } from "ioredis";
import {
	REDIS_DB,
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
} from "../configs/env.config.js";

const redis = new Redis({
	host: REDIS_HOST,
	port: REDIS_PORT,
	password: REDIS_PASSWORD,
	db: REDIS_DB,
});

redis.on("connect", () => console.log("🚀 Redis Connected"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;
