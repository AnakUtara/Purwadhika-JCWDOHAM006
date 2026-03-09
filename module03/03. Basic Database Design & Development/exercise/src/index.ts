import type { NextFunction, Request, Response } from "express";
import app, { apiRouter } from "./config/app.config.js";
import { appName, PORT } from "./config/env.config.js";
import pool from "./libs/pg.js";
import express from "express";
import { ZodError } from "zod";
import {
	createEmployeeSchema,
	updateEmployeeSchema,
} from "./validations/employee.validation.js";

apiRouter.get("/", (_req: Request, res: Response) => {
	res.send({ message: `Welcome to ${appName} API` });
});

const employeeResource = express.Router();

apiRouter.use("/employee", employeeResource);

employeeResource.get(
	"/",
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await pool.query("SELECT * FROM employee");
			res.send({
				message: "Employee data retrieved successfully",
				data: result.rows,
			});
		} catch (error) {
			next(error);
		}
	},
);

employeeResource.get(
	"/:id",
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

employeeResource.post(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validEmployee = await createEmployeeSchema.parseAsync(req.body);
			const { name, salary, department, hire_date } = validEmployee;
			const result = await pool.query(
				"INSERT INTO employee (name, salary, department, hire_date) VALUES ($1, $2, $3, $4) RETURNING *",
				[name, salary, department, hire_date],
			);
			res.status(201).send({
				message: "Employee created successfully",
				data: result.rows[0],
			});
		} catch (error) {
			next(error);
		}
	},
);

employeeResource.put(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			const validEmployee = await updateEmployeeSchema.parseAsync(req.body);
			const { name, salary, department, hire_date } = validEmployee;
			// COALESCE digunakan untuk mempertahankan nilai lama/fallback jika field tidak disertakan dalam request
			const result = await pool.query(
				"UPDATE employee SET name = COALESCE($1, name), salary = COALESCE($2, salary), department = COALESCE($3, department), hire_date = COALESCE($4, hire_date) WHERE id = $5 RETURNING *",
				[name, salary, department, hire_date, id],
			);
			if (result.rows.length === 0) {
				return next(new Error("Employee not found"));
			}
			res.send({
				message: "Employee updated successfully",
				data: result.rows[0],
			});
		} catch (error) {
			next(error);
		}
	},
);

employeeResource.delete(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			const result = await pool.query(
				"DELETE FROM employee WHERE id = $1 RETURNING *",
				[id],
			);
			if (result.rows.length === 0) {
				return next(new Error("Employee not found"));
			}
			res.send({
				message: "Employee deleted successfully",
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
