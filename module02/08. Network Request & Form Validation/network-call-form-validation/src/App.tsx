// import { useState } from "react";

import { NavLink } from "react-router";
import GenericContentCard from "./components/cards/generic.content.card";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";

function App() {
	return (
		<div className="mx-auto container p-8">
			<div className="flex w-full items-center justify-between">
				<h1>Posts</h1>
				<NavLink to={"/create-post"}>
					<Button>Create New Post</Button>
				</NavLink>
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
