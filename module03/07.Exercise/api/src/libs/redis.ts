import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err: Error | unknown) =>
	console.log("Redis Client Error", err)
);

async function connectRedis() {
	await redisClient.connect();
}

connectRedis();

export default redisClient;
