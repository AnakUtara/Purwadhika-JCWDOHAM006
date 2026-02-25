import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn-ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shadcn-ui/card";
import {
	Field,
	FieldDescription,
	// FieldDescription,
	FieldGroup,
} from "@/components/shadcn-ui/field";
import { type ComponentProps } from "react";
import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import { NavLink, useNavigate } from "react-router";
import type { TAuthFormState } from "@/model/auth.form.type";
import AuthFormFields from "./auth.form.fields";
import { Form, Formik } from "formik";
import { Spinner } from "../shadcn-ui/spinner";
import { registerSchema } from "@/validations/auth.form.validation";

export function RegisterForm({ className, ...props }: ComponentProps<"div">) {
	const { signUp } = useAuthUserStore();
	const navigate = useNavigate();

	const handleSubmit = async (
		formData: TAuthFormState & { confirmPassword: string },
	) => {
		console.log(formData);

		const { email, password } = formData;
		await signUp(email, password);
		navigate("/");
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Register a new account</CardTitle>
					<CardDescription>
						Enter your email below to create a new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Formik
						initialValues={{
							email: "",
							password: "",
							confirmPassword: "",
						}}
						validationSchema={registerSchema}
						validateOnChange={false}
						validateOnBlur={false}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<FieldGroup>
									<AuthFormFields mode="register" />
									<Field>
										<Button type="submit" disabled={isSubmitting}>
											{isSubmitting ? <Spinner /> : null} Register
										</Button>
										<FieldDescription className="text-center">
											Already have an account?{" "}
											<NavLink to="/login">Login</NavLink>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
}
