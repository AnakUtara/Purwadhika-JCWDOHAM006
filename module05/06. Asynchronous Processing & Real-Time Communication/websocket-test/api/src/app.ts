import express from "express";
import type { Application } from "express";
import { createServer } from "http";
import { APP_PORT } from "./configs/env.config.js";
import configureApp from "./configs/app.config.js";
import configureSocket from "./configs/socket.config.js";
import errorHandler, {
	routeNotFoundHandler,
} from "./middlewares/error-handler.middleware.js";
import apiRouter from "./router/api.router.js";
// tsx will automatically watch the worker files and run them in separate processes, so we just need to import them here to ensure they are included in the build and run process
// If we have multiple workers, we can create an index file in the workers directory that imports all worker files, and then import that index file here to keep things organized
import "./workers/test.worker.js";
import { scheduledTasksNotification } from "./cron/jobs/notification.js";

const app: Application = express();
const httpServer = createServer(app);

configureApp(app);
configureSocket(httpServer);

scheduledTasksNotification(); // Start the scheduled task notifications

app.use("/api", apiRouter);

app.use(routeNotFoundHandler);

app.use(errorHandler);

httpServer.listen(APP_PORT, () => {
	console.log(`Server is running on port ${APP_PORT}`);
});

export default app;
