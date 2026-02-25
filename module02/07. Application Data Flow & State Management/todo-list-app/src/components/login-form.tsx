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
	// FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/shadcn-ui/field";
import { Input } from "@/components/shadcn-ui/input";
import {
	useState,
	type ChangeEvent,
	type ComponentProps,
	type SubmitEvent,
	type SubmitEventHandler,
} from "react";
import {
	useAuthUserStore,
	type TAuthUserState,
} from "@/lib/stores/auth-user.store";
import { useNavigate } from "react-router";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	const { signIn } = useAuthUserStore();
	const navigate = useNavigate();
	const [loginFormState, setLoginFormState] = useState<TAuthUserState>({
		email: "",
		password: "",
	});

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
		e: SubmitEvent<HTMLFormElement>,
	) => {
		// Menghentikan perilaku default form submit (refresh halaman)
		e.preventDefault();

		const { email, password } = loginFormState;
		signIn(email, password);
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
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={loginFormState.email}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										setLoginFormState((prev) => ({
											...prev,
											email: e.target.value,
										}));
									}}
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									{/* <a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a> */}
								</div>
								<Input
									id="password"
									type="password"
									placeholder="********"
									value={loginFormState.password}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										setLoginFormState((prev) => ({
											...prev,
											password: e.target.value,
										}));
									}}
									required
								/>
							</Field>
							<Field>
								<Button type="submit">Login</Button>
								{/* <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription> */}
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
