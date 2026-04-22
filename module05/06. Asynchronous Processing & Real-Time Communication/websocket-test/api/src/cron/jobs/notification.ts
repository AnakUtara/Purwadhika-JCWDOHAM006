import { scheduler } from "../scheduler.js";

export const scheduledTasksNotification = async () => {
	// "*/15 * * * *" means every 15 minutes. You can adjust this cron expression as needed.
	scheduler("*/15 * * * *", async () => {
		console.log("Trying to send task notification per 15 minutes");
		// You can use cron to schedule any task.
		// You can do Prisma client queries here to check for pending tasks and send notifications accordingly.
		// anything that needs scheduling can be done here, even like triggering a BullMQ job to send emails or push notifications.
	});
};
