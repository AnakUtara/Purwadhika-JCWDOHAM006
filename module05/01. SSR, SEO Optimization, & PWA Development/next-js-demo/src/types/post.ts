export type Post = {
	id: number;
	title: string;
	body: string;
	tags: string[];
	reactions: { likes: number; dislikes: number };
	views: number;
	userId: number;
};

export type PostsResponse = {
	posts: Post[];
	total: number;
	skip: number;
	limit: number;
};

export type Comment = {
	id: number;
	body: string;
	user: { username: string };
	likes: number;
};

export type CommentsResponse = {
	comments: Comment[];
	total: number;
};
