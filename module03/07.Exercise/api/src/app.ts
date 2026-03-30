import express, {
	Application,
	json,
	NextFunction,
	Request,
	Response,
	urlencoded,
} from "express";
import fs from "fs";
import cors from "cors";
import { join } from "path";
import { APP_NAME, PORT } from "./config/app.config";
import AppError from "./errors/app.error";
import sampleRoute from "./routes/sample.route";
import corsOptions from "./middlewares/express/cors";
import postRoute from "./routes/post.route";
import authorRoute from "./routes/author.route";
import authRoute from "./routes/auth.route";
import storageRoute from "./routes/storage.route";
import { toggleAdminScheduler } from "./jobs/test";

export default class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.router();
		this.errorHandlers();
		toggleAdminScheduler();
	}

	private config(): void {
		this.app.use(json());
		this.app.use(urlencoded({ extended: true }));
		this.app.use(cors(corsOptions));
	}

	private router(): void {
		const apiRouter = express.Router();
		// Prefix all routes with /api
		this.app.use("/api", apiRouter);
		// Welcome route
		apiRouter.get("/", (_: Request, res: Response) =>
			res.send(`Welcome to the ${APP_NAME} API`)
		);
		// Define static route for files
		apiRouter.use(
			"/images",
			express.static(join(__dirname, "../public/images"))
		);
		// Define routes here
		apiRouter.use("/auth", authRoute.useRouter());
		apiRouter.use("/storage", storageRoute.useRouter());
		apiRouter.use("/samples", sampleRoute.useRouter());
		apiRouter.use("/posts", postRoute.useRouter());
		apiRouter.use("/authors", authorRoute.useRouter());
	}

	private errorHandlers(): void {
		const logErrorHandler = (message: string) => {
			const timestamp = new Date().toISOString();
			const logMessage = `${timestamp}-${message}`;

			fs.appendFile(join(__dirname, "./logs/error.log"), logMessage, (err) => {
				if (err) console.error("Failed to write to log file:", err);
			});
		};
		// * 404 Handler
		this.app.use((_: Request, res: Response) => {
			console.error("404 Not Found");
			return res.status(404).send({ message: "Not Found" });
		});

		// * Global Error Handler
		this.app.use(
			(error: AppError, _: Request, res: Response, __: NextFunction) => {
				console.table({
					errorStatus: error.status,
					errorMessage: error.message,
				});
				logErrorHandler(`${error.status} - ${error.message}\n`);
				return res.status(error.status || 500).send({
					status: error.status || 500,
					message: error.message || "Internal Server Error",
				});
			}
		);
	}

	start(): void {
		this.app.listen(PORT, () =>
			console.log(`-> [API] Local: http://localhost:${PORT}`)
		);
	}
}
