import CenterBodyContainer from "@/components/layout/center-body-container.layout";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios/axios.config";
import type IPost from "@/model/posts.type";
import type { TUpdatePost } from "@/model/posts.type";
import { getPostsById } from "@/services/posts.service";
import { createPostSchema } from "@/validations/posts.schema";
import { ErrorMessage, Form, Formik, type FormikHelpers } from "formik";
import { ChevronLeftCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditPostPage = () => {
	// Data id ini akan otomatis diisi oleh ":id" yang kita deklarasikan di Route pada main.tsx
	const { id } = useParams();
	const navigate = useNavigate();

	// Dalam kasus update kita harus mengambil 1 data post menggunakan id dulu
	// Data itu nanti akan kita jadikan initialValues di Formik
	// Supaya ketika user masuk ke halaman edit, formnya sudah terisi dengan data post yang mau di edit
	// Karena berarti getPostById akan dipakai di sini & di PostDetailsPage
	// Maka dari itu function-nya bisa dipindahkan ke file src/lib/posts/posts.service.ts untuk dipakai ulang
	// Seperti contoh implementasi berikut:

	const [initData, setInitData] = useState<IPost | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleFetchPostById = async () => {
		setLoading(true);
		const post = await getPostsById(id || "");
		setInitData(post);
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			handleFetchPostById();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleSubmit = async (
		formData: TUpdatePost,
		helpers: FormikHelpers<TUpdatePost>,
	) => {
		const { resetForm } = helpers;
		console.log("Form Data: ", formData);
		try {
			await axiosInstance.put(`/posts/${id}`, formData);
			toast.success("Post Updated Successfully!");
			resetForm();
			navigate("/");
		} catch (error) {
			console.error(
				"Error updating post:",
				error instanceof Error ? error.message : error,
			);
			toast.error("Failed to update post. Please try again.");
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
				<h1 className="mb-4 text-2xl font-bold">Edit Post</h1>
			</div>
			<p className="text-muted-foreground">
				This is where the form to edit an existing post will go.
			</p>
			<Separator className="my-4" />
			<Formik
				initialValues={
					{
						title: initData?.title || "",
						body: initData?.body || "",
					} as TUpdatePost
				}
				// Karena bentuk update and create sama saja, kita bisa pakai createPostSchema sebagai validation schema
				validationSchema={createPostSchema}
				onSubmit={handleSubmit}
				// Untuk edit pastikan enableReinitialize diaktifkan
				// ini akan membuat Formik melakukan inisialisasi ulang form setiap kali initialValues berubah
				enableReinitialize
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<div className="flex flex-col gap-4">
							<Field>
								<FieldLabel htmlFor="title">Title</FieldLabel>
								<Input
									id="title"
									placeholder={loading ? "Loading..." : "Enter post title"}
									value={values.title}
									onChange={handleChange}
									// Pattern ini memastikan kalau form tidak bisa diubah
									// sampai data post yang mau diedit selesai dimuat
									disabled={isSubmitting || loading}
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
									placeholder={loading ? "Loading..." : "Enter post content"}
									value={values.body}
									onChange={handleChange}
									className="h-32"
									disabled={isSubmitting || loading}
								/>
								<ErrorMessage
									name="body"
									component={"div"}
									className="text-red-400 text-xs"
								/>
							</Field>
							<Button
								className="mt-4"
								type="submit"
								disabled={isSubmitting || loading}
							>
								{loading ? (
									<Spinner />
								) : isSubmitting ? (
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

export default EditPostPage;
