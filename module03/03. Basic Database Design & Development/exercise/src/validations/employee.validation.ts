import z from "zod";

const commonSchema = {
	name: z.string().min(1, "Name is required"),
	salary: z.coerce.number().positive("Salary must be a positive number"),
	department: z.string().min(1, "Department is required"),
	hire_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
};

export const createEmployeeSchema = z.object({
	...commonSchema,
});

export const updateEmployeeSchema = z
	.object({
		...commonSchema,
	})
	.partial();

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
