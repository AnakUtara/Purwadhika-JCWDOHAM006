import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().optional(),
	email: z.string().email(),
});

export const updateUserSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
