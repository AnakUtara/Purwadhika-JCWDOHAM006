import { Worker } from "bullmq";
import testJob from "../queues/jobs/test.job.js";
import { redisConfig } from "../libs/redis.js";
import logger from "../utils/logger.js";

const testWorker = new Worker(
	"test-queue",
	async (job) => {
		switch (job.name) {
			case "sendEmail":
				const { email } = job.data;

				await testJob({ email });

				break;
			default:
				console.warn(`Unknown job name: ${job.name}`);
		}
	},
	{ connection: redisConfig },
);

testWorker.on("active", (job) => {
	console.log(`🏃 Job ${job.id} has started processing...`);
});

testWorker.on("completed", (job) => {
	console.log(`✅ Job ${job.id} is finished!`);
});

testWorker.on("failed", (job, err) => {
	logger.error(`❌ Job ${job?.id} failed: ${err.message}`, {
		jobId: job?.id,
		error: err,
	});
	console.log(`❌ Job ${job?.id} failed: ${err.message}`);
});

export default testWorker;
