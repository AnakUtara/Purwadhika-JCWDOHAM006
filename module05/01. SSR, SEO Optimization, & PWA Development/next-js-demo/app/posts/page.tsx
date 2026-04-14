import Link from "next/link";
import { getPosts, LIMIT } from "@/src/lib/api/posts";

export const metadata = {
	title: "Posts",
	description: "Browse all posts fetched from DummyJSON",
};

export default async function PostsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page: pageParam } = await searchParams;
	const page = Math.max(1, Number(pageParam) || 1);
	const { posts, total } = await getPosts(page);
	const totalPages = Math.ceil(total / LIMIT);

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">Posts</h1>
				<p className="text-gray-500 mb-8">
					Fetched from{" "}
					<a
						href="https://dummyjson.com/posts"
						className="text-indigo-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						dummyjson.com
					</a>{" "}
					· Page {page} of {totalPages}
				</p>

				<ul className="space-y-4 mb-10">
					{posts.map((post) => (
						<li key={post.id} className="bg-white rounded-lg shadow p-6">
							<Link href={`/posts/${post.id}`}>
								<h2 className="text-lg font-semibold text-gray-800 mb-2 capitalize hover:text-indigo-600">
									{post.title}
								</h2>
							</Link>
							<p className="text-gray-600 text-sm mb-4">{post.body}</p>
							<div className="flex flex-wrap items-center gap-3 text-xs">
								<div className="flex gap-2">
									{post.tags.map((tag) => (
										<span
											key={tag}
											className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full"
										>
											#{tag}
										</span>
									))}
								</div>
								<span className="ml-auto text-gray-400">
									👍 {post.reactions.likes} · 👎 {post.reactions.dislikes} · 👁️{" "}
									{post.views}
								</span>
							</div>
						</li>
					))}
				</ul>

				{/* Pagination */}
				<div className="flex items-center justify-center gap-2">
					{page > 1 && (
						<Link
							href={`/posts?page=${page - 1}`}
							className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
						>
							← Prev
						</Link>
					)}

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
						<Link
							key={p}
							href={`/posts?page=${p}`}
							className={`px-3 py-2 rounded-lg text-sm shadow-sm border ${
								p === page
									? "bg-indigo-600 text-white border-indigo-600"
									: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
							}`}
						>
							{p}
						</Link>
					))}

					{page < totalPages && (
						<Link
							href={`/posts?page=${page + 1}`}
							className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
						>
							Next →
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
