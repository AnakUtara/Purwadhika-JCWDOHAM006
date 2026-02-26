// import { useState } from "react";

import { NavLink } from "react-router";
import GenericContentCard from "./components/cards/generic.content.card";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import axiosInstance from "./lib/axios/axios.config";
import { useEffect, useState } from "react";
import LoadingScreen from "./pages/loading.screen";
import type IPost from "./model/posts.type";
import CenterBodyContainer from "./components/layout/center-body-container.layout";
import { getPosts } from "./services/posts.service";

// getPosts() sudah dipindahkan ke file src/lib/posts/posts.service.ts
// Sehingga kita bisa import function getPosts dari file tersebut untuk dipakai di sini
// Dan membuat kode menjadi lebih terorganisir

function App() {
	/*
		HINT: Untuk mengurangi duplikasi fetch entah untuk semua/satu post
		Kita bisa buat function getPosts/getPostById di file src/lib/posts/posts.service.ts
		Lalu bungkus state data, loading, handleFetchPosts/handleFetchPostById di custom hook usePosts/usePostById
		Sehingga ketika kita mau fetch data post di halaman lain, kita tinggal panggil custom hook itu saja tanpa perlu buat state & function fetch lagi.
		Untuk implementasi custom hook yang sifatnya fetch in general di mana parameternya menerima url endpoint dan config axios,
		bisa lihat contohnya di file src/hooks/useFetch.ts ya.

		Kalau sudah mulai antara nyaman atau muak dengan nulis data, loading, error di setiap halaman
		berarti boleh banget buat cek package namanya Tanstack React Query (https://tanstack.com/query/latest) yang bisa handle 
		state data, loading, error untuk semua request yang kita buat, 
		dan juga punya fitur-fitur lain seperti caching, refetching, pagination, dll 
		yang bisa sangat membantu untuk manage server state di aplikasi kita dengan rapih dan minim duplikasi kode.
	 */

	const [data, setData] = useState<IPost[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [waitDelete, setWaitDelete] = useState<number | null>(null);

	const handleFetchPosts = async () => {
		setLoading(true);
		const posts = await getPosts();
		setData(posts);
		setLoading(false);
	};

	const handleDeletePost = async (id: number) => {
		setWaitDelete(id);
		try {
			await axiosInstance.delete(`/posts/${id}`);
			// Optimistic update: langsung hapus dari UI tanpa menunggu response
			setData((prev) =>
				prev ? prev.filter((post) => post.objectId !== id) : null,
			);
		} catch (error: Error | unknown) {
			console.error(
				"Error deleting post:",
				error instanceof Error ? error.message : error,
			);
		} finally {
			setWaitDelete(null);
		}
	};

	useEffect(() => {
		handleFetchPosts();
	}, []);

	return (
		<CenterBodyContainer>
			<div className="flex w-full items-center justify-between">
				<h1>Posts</h1>
				<NavLink to={"/create-post"}>
					<Button>Create New Post</Button>
				</NavLink>
			</div>
			<Separator className="my-4" />
			{loading ? (
				<LoadingScreen height="full" />
			) : data ? (
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data.map((post: IPost) => (
						<GenericContentCard
							key={post.objectId}
							post={post}
							onDelete={handleDeletePost}
							waitDelete={waitDelete === post.objectId}
						/>
					))}
				</section>
			) : (
				<div className="flex items-center justify-center h-[50vh] text-muted-foreground">
					No posts made yet...
				</div>
			)}
		</CenterBodyContainer>
	);
}

export default App;
