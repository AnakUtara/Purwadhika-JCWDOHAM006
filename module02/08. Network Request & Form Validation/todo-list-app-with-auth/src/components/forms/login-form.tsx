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
import { loginSchema } from "@/validations/auth.form.validation";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	const { signIn } = useAuthUserStore();
	const navigate = useNavigate();

	const handleSubmit = async (formData: TAuthFormState) => {
		console.log(formData);

		const { email, password } = formData;
		await signIn(email, password);
		navigate("/");
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={loginSchema}
						validateOnChange={false}
						validateOnBlur={false}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<FieldGroup>
									<AuthFormFields mode="login" />
									<Field>
										<Button type="submit" disabled={isSubmitting}>
											{isSubmitting ? <Spinner /> : null} Login
										</Button>
										<FieldDescription className="text-center">
											Don&apos;t have an account?{" "}
											<NavLink to="/register">Sign up</NavLink>
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
