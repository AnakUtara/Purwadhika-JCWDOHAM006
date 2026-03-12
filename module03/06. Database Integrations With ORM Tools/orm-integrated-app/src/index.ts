import type { NextFunction, Request, Response } from "express";
import app from "./configs/app.config.js";
import { ZodError } from "zod";
import { PORT } from "./configs/env.config.js";
import apiRouter from "./routers/api.router.js";

app.use("/api", apiRouter);

// 404 Not Found Handler
app.use((_req: Request, res: Response) => {
	res.status(404).send({ message: "Route not found" });
});

// Application wide Error handling
app.use(
	(
		error: Error | unknown,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) => {
		console.error("Error: ", error);
		if (error instanceof ZodError) {
			return res.status(400).send({
				message: "Validation Error",
				errors: error.issues,
			});
		}
		res.status(500).send({ message: "Internal Server Error" });
	},
);

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
