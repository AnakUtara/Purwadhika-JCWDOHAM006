import AppError from "../errors/app.error";
import prisma from "../libs/prisma/prisma.client";
import { scheduler } from "./scheduler/scheduler";

const testScheduler = () =>
	scheduler("*/1 * * * * *", () => {
		console.log("Job executed every 1 second");
	});

const toggleAdminScheduler = () =>
	scheduler("*/1 * * * *", async () => {
		const targetUser = await prisma.user.findFirst({
			where: { email: "tok.riady@gmail.com" },
		});
		if (targetUser?.role === "ADMIN") {
			await prisma.user.update({
				where: { id: targetUser.id },
				data: { role: "USER" },
			});
			console.log("Role changed to USER");
		} else if (targetUser?.role === "USER") {
			await prisma.user.update({
				where: { id: targetUser.id },
				data: { role: "ADMIN" },
			});
			console.log("Role changed to ADMIN");
		} else {
			console.log("User not found or has no role");
		}
	});

export default testScheduler;
export { toggleAdminScheduler };
