import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { APP_HOST, APP_PORT } from "./configs/env.config.js";
import { prisma } from "./libs/prisma.js";
import redis from "./libs/redis.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import logger from "./utils/logger.js";
import { AppError } from "./errors/app.error.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
	}),
);

const apiRouter = express.Router();

app.use("/api", apiRouter);

apiRouter.get("/", (_req: Request, res: Response) => {
	res.send("Welcome to the Reliability API!");
});

apiRouter.get(
	"/actors",
	async (_req: Request, res: Response, next: NextFunction) => {
		const cacheKey = "actors:all";
		let cachedData: string | null = null;

		// --- 1. ATTEMPT CACHE READ ---
		try {
			cachedData = await redis.get(cacheKey);
			if (cachedData) {
				console.log("📦 [CACHE HIT] Serving from Redis");
				return res.send({
					message: "Actors retrieved from cache",
					data: JSON.parse(cachedData),
				});
			}
		} catch (redisError: unknown) {
			// We log the error but DO NOT send a res.status(500)
			console.error(
				"⚠️ [REDIS READ ERROR] Cache unavailable, falling back:",
				(redisError as Error).message,
			);
			logger.error(`Redis read error: ${(redisError as Error).message}`, {
				stack: (redisError as Error).stack,
			});
		}

		// --- 2. DATABASE FALLBACK ---
		try {
			console.log("📡 [DB FETCH] Querying Neon/Prisma...");
			const actors = await prisma.actor.findMany();

			if (!actors || actors.length === 0) {
				throw new AppError("No actors found in the database", 404); // This will be caught by our error handler middleware
			}

			// --- 3. ATTEMPT CACHE WRITE ---
			try {
				// We don't 'await' this if we want it to be truly non-blocking,
				// but for a demo, awaiting is fine.
				await redis.set(cacheKey, JSON.stringify(actors), "EX", 60);
				console.log("💾 [CACHE WRITE] Updated Redis with fresh data");
			} catch (writeError: unknown) {
				console.error(
					"⚠️ [REDIS WRITE ERROR] Could not save to cache:",
					(writeError as Error).message,
				);
				logger.error(`Redis write error: ${(writeError as Error).message}`, {
					stack: (writeError as Error).stack,
				});
			}

			return res.send({
				message: "Actors retrieved successfully",
				data: actors,
				source: "database",
			});
		} catch (dbError) {
			next(dbError); // Pass to error handler middleware
		}
	},
);

apiRouter.get(
	"/actors/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const cacheKey = `actors:${id}`;
		try {
			const cached = await redis.get(cacheKey);

			if (cached) {
				console.log(`Cache hit for actor ${id}`);
				return res.send({
					message: "Actor retrieved from cache",
					data: JSON.parse(cached),
				});
			}

			const actor = await prisma.actor.findUnique({
				where: { actor_id: Number(id) },
			});

			if (!actor) {
				throw new AppError("Actor not found", 404); // This will be caught by our error handler middleware
			}

			await redis.set(cacheKey, JSON.stringify(actor), "EX", 60); // Cache for 10 seconds

			res.send({ message: "Actor retrieved successfully", data: actor });
		} catch (error: unknown) {
			console.error(`Error retrieving actor ${id}:`, (error as Error).message);
			next(error); // Pass to error handler middleware
		}
	},
);

app.use(errorHandler);

app.listen(APP_PORT, APP_HOST, () => {
	console.log(`Server is running on http://${APP_HOST}:${APP_PORT}`);
});
