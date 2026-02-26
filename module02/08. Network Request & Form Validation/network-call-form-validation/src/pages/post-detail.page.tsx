import CenterBodyContainer from "@/components/layout/center-body-container.layout";
import type IPost from "@/model/posts.type";
import { getPostsById } from "@/services/posts.service";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import LoadingScreen from "./loading.screen";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

const PostDetailPage = () => {
	const [details, setDetails] = useState<IPost | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const { id } = useParams();

	const handleFetchPostById = async () => {
		setLoading(true);
		const post = await getPostsById(id || "");
		setDetails(post);
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			handleFetchPostById();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (loading) {
		return <LoadingScreen height="screen" />;
	}

	return (
		<CenterBodyContainer>
			<div className="flex gap-2">
				<NavLink to={"/"}>
					<Button variant={"ghost"} size={"icon"}>
						<ChevronLeftCircle className="size-6" />
					</Button>
				</NavLink>
				<h1 className="text-4xl font-black">{details?.title}</h1>
			</div>
			<Separator className="my-4" />
			<p className="text-muted-foreground">{details?.body}</p>
		</CenterBodyContainer>
	);
};

export default PostDetailPage;
