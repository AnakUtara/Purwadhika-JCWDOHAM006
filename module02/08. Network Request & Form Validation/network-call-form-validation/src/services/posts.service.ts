import axiosInstance from "@/lib/axios/axios.config";

export const getPosts = async () => {
	try {
		const res = await axiosInstance.get("/posts");
		return res.data;
	} catch (error: Error | unknown) {
		console.error(
			"Error fetching posts:",
			error instanceof Error ? error.message : error,
		);
	}
};

export const getPostsById = async (id: string) => {
	try {
		const res = await axiosInstance.get(`/posts/${id}`);
		return res.data;
	} catch (error) {
		console.error(
			"Error fetching post by id:",
			error instanceof Error ? error.message : error,
		);
	}
};
