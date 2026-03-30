import yup from "../libs/yup";

const sharedCategorySchema = {
	name: yup.string().trim().min(2).max(50),
};

export const createCategorySchema = yup.object().shape({
	...sharedCategorySchema,
	name: sharedCategorySchema.name.required("Name is required"),
});

export const updateCategorySchema = yup.object().shape({
	...sharedCategorySchema,
	name: sharedCategorySchema.name.optional(),
});

export const categoryConnectIdSchema = yup.object().shape({
	id: yup.number().positive().integer().required("Category ID is required"),
});

export const categoryCreateOrConnectSchema = yup.object().shape({
	name: sharedCategorySchema.name.required("Name is required"),
});

export const categoryIdArraySchema = yup.array().of(categoryConnectIdSchema);
