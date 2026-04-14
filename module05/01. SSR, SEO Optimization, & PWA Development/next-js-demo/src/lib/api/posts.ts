import type { CommentsResponse, Post, PostsResponse } from "@/src/types/post";

const BASE_URL = "https://dummyjson.com";
const LIMIT = 10;

export async function getPosts(page: number): Promise<PostsResponse> {
	const skip = (page - 1) * LIMIT;
	const res = await fetch(`${BASE_URL}/posts?limit=${LIMIT}&skip=${skip}`, {
		cache: "no-store",
	});
	return res.json();
}

export async function getPost(id: string): Promise<Post | null> {
	const res = await fetch(`${BASE_URL}/posts/${id}`, { cache: "no-store" });
	if (!res.ok) return null;
	return res.json();
}

export async function getPostComments(id: string): Promise<CommentsResponse> {
	const res = await fetch(`${BASE_URL}/posts/${id}/comments`, {
		cache: "no-store",
	});
	return res.json();
}

export { LIMIT };
