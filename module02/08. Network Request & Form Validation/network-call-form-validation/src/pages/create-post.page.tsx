import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeftCircle } from "lucide-react";
import { NavLink } from "react-router";

const CreatePostPage = () => {
	return (
		<div className="mx-auto container p-8">
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
			<div className="flex flex-col gap-4">
				<Field>
					<FieldLabel htmlFor="title">Title</FieldLabel>
					<Input id="title" placeholder="Enter post title" />
				</Field>
				<Field>
					<FieldLabel htmlFor="body">Content</FieldLabel>
					<Textarea
						id="body"
						placeholder="Enter post content"
						className="h-32"
					/>
				</Field>
				<Button className="mt-4" type="submit">
					Submit
				</Button>
			</div>
		</div>
	);
};

export default CreatePostPage;
