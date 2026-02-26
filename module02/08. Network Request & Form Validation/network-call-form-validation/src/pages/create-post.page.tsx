import CenterBodyContainer from "@/components/layout/center-body-container.layout";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios/axios.config";
import type { TCreatePost } from "@/model/posts.type";
import { createPostSchema } from "@/validations/posts.schema";
import { ErrorMessage, Form, Formik, type FormikHelpers } from "formik";
import { ChevronLeftCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

const CreatePostPage = () => {
	const navigate = useNavigate();

	const handleSubmit = async (
		formData: TCreatePost,
		helpers: FormikHelpers<TCreatePost>,
	) => {
		const { resetForm } = helpers;
		console.log("Form Data: ", formData);
		try {
			await axiosInstance.post("/posts", formData);
			toast.success("New Post Created Successfully!");
			resetForm();
			navigate("/");
		} catch (error) {
			console.error(
				"Error creating post:",
				error instanceof Error ? error.message : error,
			);
			toast.error("Failed to create post. Please try again.");
		}
	};

	return (
		<CenterBodyContainer>
			<div className="flex gap-2">
				<NavLink to={"/"}>
					<Button variant={"ghost"} size={"icon"}>
						<ChevronLeftCircle className="size-6" />
					</Button>
				</NavLink>
				<h1 className="mb-4 text-2xl font-bold">Create New Post</h1>
			</div>
			<p className="text-muted-foreground">
				This is where the form to create a new post will go.
			</p>
			<Separator className="my-4" />
			<Formik
				initialValues={{ title: "", body: "" } as TCreatePost}
				validationSchema={createPostSchema}
				onSubmit={handleSubmit}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<div className="flex flex-col gap-4">
							<Field>
								<FieldLabel htmlFor="title">Title</FieldLabel>
								<Input
									id="title"
									placeholder="Enter post title"
									value={values.title}
									onChange={handleChange}
									disabled={isSubmitting}
								/>
								<ErrorMessage
									name="title"
									component={"div"}
									className="text-red-400 text-xs"
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="body">Content</FieldLabel>
								<Textarea
									id="body"
									placeholder="Enter post content"
									value={values.body}
									onChange={handleChange}
									className="h-32"
									disabled={isSubmitting}
								/>
								<ErrorMessage
									name="body"
									component={"div"}
									className="text-red-400 text-xs"
								/>
							</Field>
							<Button className="mt-4" type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Spinner />
										Submitting...
									</>
								) : (
									"Submit"
								)}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</CenterBodyContainer>
	);
};

export default CreatePostPage;
