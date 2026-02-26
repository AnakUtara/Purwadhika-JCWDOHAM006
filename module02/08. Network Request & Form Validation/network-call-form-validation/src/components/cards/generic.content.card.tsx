import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import type IPost from "@/model/posts.type";
import { NavLink } from "react-router";

type Props = {
	post: IPost;
	onDelete: (id: number) => void;
	waitDelete?: boolean;
};

const GenericContentCard = ({ post, onDelete, waitDelete }: Props) => {
	const { objectId, title, body } = post;
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<NavLink to={`/posts/${objectId}`}>
						<CardTitle className="hover:underline hover:text-muted-foreground">
							{title.length > 20 ? title.slice(0, 20) + "..." : title}
						</CardTitle>
					</NavLink>
					<CardAction>
						<Button
							size={"icon"}
							variant={"destructive"}
							onClick={() => onDelete(objectId)}
							disabled={waitDelete}
						>
							{waitDelete ? <Spinner /> : <Trash />}
						</Button>{" "}
					</CardAction>
				</div>
			</CardHeader>
			<Separator />
			<CardContent>
				<CardDescription className="h-14 line-clamp-1">
					{body.length > 100 ? body.slice(0, 100) + "..." : body}
				</CardDescription>
			</CardContent>
			<Separator />
			<CardFooter>
				<CardAction className="w-full">
					<NavLink to={`/posts/${objectId}/edit`}>
						<Button className="w-full">
							<Edit /> Edit Post
						</Button>
					</NavLink>
				</CardAction>
			</CardFooter>
		</Card>
	);
};

export default GenericContentCard;
