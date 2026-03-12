import z from "zod";

const commonSchema = {
	title: z
		.string()
		.min(1, "Title is required")
		.max(200, "Title must be less than 200 characters"),
	content: z
		.string()
		.min(1, "Content is required")
		.max(1000, "Content must be less than 1000 characters"),
};

const postCreateSchema = z.object({
	...commonSchema,
});

const postUpdateSchema = z
	.object({
		...commonSchema,
	})
	.partial();

export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;

export { postCreateSchema, postUpdateSchema };
