import * as Yup from "yup";

const commonSchema = {
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
};

const registerSchema = Yup.object().shape({
	...commonSchema,
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), ""], "Passwords must match")
		.required("Confirm Password is required"),
});

const loginSchema = Yup.object().shape({
	...commonSchema,
});

export { registerSchema, loginSchema };
