import type { TAuthFormState } from "@/model/auth.form.type";
import { Field, FieldLabel } from "../shadcn-ui/field";
import { Input } from "../shadcn-ui/input";
import { ErrorMessage, useFormikContext } from "formik";

const AuthFormFields = ({ mode }: { mode: "login" | "register" }) => {
	const { values, handleChange, errors, isSubmitting } = useFormikContext<
		TAuthFormState & { confirmPassword?: string }
	>();
	return (
		<>
			<Field>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Input
					id="email"
					type="email"
					placeholder="m@example.com"
					value={values.email}
					onChange={handleChange}
					className={errors.email ? "border-red-500" : ""}
					disabled={isSubmitting}
				/>
				<ErrorMessage
					name="email"
					component="div"
					className="text-red-500 text-sm mt-1"
				/>
			</Field>
			<Field>
				<div className="flex items-center">
					<FieldLabel htmlFor="password">Password</FieldLabel>
				</div>
				<Input
					id="password"
					type="password"
					placeholder="********"
					value={values.password}
					onChange={handleChange}
					className={errors.password ? "border-red-500" : ""}
					disabled={isSubmitting}
				/>
				<ErrorMessage
					name="password"
					component="div"
					className="text-red-500 text-sm mt-1"
				/>
			</Field>
			{mode === "register" ? (
				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
					</div>
					<Input
						id="confirmPassword"
						type="password"
						placeholder="********"
						value={values.confirmPassword || ""}
						onChange={handleChange}
						className={errors.confirmPassword ? "border-red-500" : ""}
						disabled={isSubmitting}
					/>
					<ErrorMessage
						name="confirmPassword"
						component="div"
						className="text-red-500 text-sm mt-1"
					/>
				</Field>
			) : null}
		</>
	);
};

export default AuthFormFields;
