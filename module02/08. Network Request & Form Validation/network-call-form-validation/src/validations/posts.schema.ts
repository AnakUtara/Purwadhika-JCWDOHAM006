import Yup from "@/lib/yup";

const commonSchema = {
	title: Yup.string()
		.max(100, "Cannot exceed 100 characters")
		.required("Title is required"),
	body: Yup.string()
		.max(500, "Cannot exceed 500 characters")
		.required("Content is required"),
};

const createPostSchema = Yup.object().shape(commonSchema);

export { createPostSchema };
