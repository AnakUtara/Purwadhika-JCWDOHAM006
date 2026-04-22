import { Queue } from "bullmq";
import { redisConfig } from "../libs/redis.js";

// Categorize queue with files under src/queues for better organization
// Use reusable redisConfig for consistent Redis connection settings across new queues
// Example: media upload queues can be added to src/queues/media.queue.ts using the same redisConfig
// And inside the file will be something like:
// import { Queue } from "bullmq";
// import { redisConfig } from "../libs/redis.js";
//
// export const videoQueue = new Queue("video-processing", {
// 	connection: redisConfig,
// });
// export const imageQueue = new Queue("image-processing", {
// 	connection: redisConfig,
// });
// This structure keeps queue definitions organized and promotes code reuse for Redis connections
// Since worker files will listen to specific queues, categorizing queues by their purpose (e.g., media, notifications) can help maintain clarity as the application grows

// For simpler implementation, we can start with a single queue manager file
// which will host all queues and their configurations. As the application scales, we can refactor to separate files if needed.

export const testQueue = new Queue("test-queue", { connection: redisConfig });
