import type { NextFunction, Request, Response } from "express";
import app from "./config/app.config.js";
import { appName, PORT } from "./config/env.config.js";
import pool from "./libs/pg.js";

app.get("/", (_req: Request, res: Response) => {
	res.send({ message: `Welcome to ${appName} API` });
});

app.get("/employee", async (_req: Request, res: Response) => {
	const result = await pool.query("SELECT * FROM employee");
	res.send({
		message: "Employee data retrieved successfully",
		data: result.rows,
	});
});

app.get(
	"/employee/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			const result = await pool.query("SELECT * FROM employee WHERE id = $1", [
				id,
			]);
			if (result.rows.length === 0) {
				return next(new Error("Employee not found"));
			}
			res.send({
				message: "Employee data retrieved successfully",
				data: result.rows[0],
			});
		} catch (error) {
			next(error);
		}
	},
);

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
		res.status(500).send({ message: "Internal Server Error" });
	},
);

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
