import yup from "../libs/yup";
import { categoryIdArraySchema } from "./categories.validation";

const sharedPostSchema = {
	title: yup.string().trim().min(2),
	slug: yup.string().trim().lowercase(),
	content: yup.string().trim().min(10).max(1000),
	excerpt: yup.string().trim().max(255),
	imageUrl: yup.string().trim(),
	categories: yup
		.array()
		.of(yup.object().shape({ id: yup.number().positive().integer() }))
		.optional(),
};

export const createPostSchema = yup.object().shape({
	...sharedPostSchema,
	title: sharedPostSchema.title.required("Title is required"),
	slug: sharedPostSchema.slug.required("Slug is required"),
	content: sharedPostSchema.content.required("Content is required"),
	excerpt: sharedPostSchema.excerpt.required("Excerpt is required"),
	imageUrl: sharedPostSchema.imageUrl.required("Image URL is required"),
});

export const updatePostSchema = yup.object().shape({
	...sharedPostSchema,
	title: sharedPostSchema.title.optional(),
	slug: sharedPostSchema.slug.optional(),
	content: sharedPostSchema.content.optional(),
	excerpt: sharedPostSchema.excerpt.optional(),
	imageUrl: sharedPostSchema.imageUrl.optional(),
});
