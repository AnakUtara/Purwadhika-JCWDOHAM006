// import { useState } from "react";

import GenericContentCard from "./components/cards/generic.content.card";
import GenericDialog, {
	FormDialogFooter,
} from "./components/dialogs/generic.dialog";
import { Field, FieldLabel } from "./components/ui/field";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";

function App() {
	return (
		<div className="mx-auto container p-8">
			<div className="flex w-full items-center justify-between">
				<h1>Posts</h1>
				<GenericDialog
					triggerLabel="Create New Post"
					dialogTitle="Create New Post"
					dialogDescription="Fill in the form below to create a new post"
				>
					<div className="no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-4">
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
						</div>
					</div>
					<FormDialogFooter submitLabel="Submit" />
				</GenericDialog>
			</div>
			<Separator className="my-4" />
			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<GenericContentCard
					title="Post 1"
					body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
				<GenericContentCard
					title="Post 2"
					body="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				/>
				<GenericContentCard
					title="Post 3"
					body="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
				/>
			</section>
		</div>
	);
}

export default App;
