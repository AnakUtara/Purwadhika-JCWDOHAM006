import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostComments } from "@/src/lib/api/posts";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await getPost(id);
	if (!post) return { title: "Post Not Found" };
	return {
		title: post.title,
		description: post.body.slice(0, 120),
	};
}

export default async function PostDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	// Fetch post and comments in parallel
	const [post, { comments, total: totalComments }] = await Promise.all([
		getPost(id),
		getPostComments(id),
	]);

	if (!post) notFound();

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<Link
					href="/posts"
					className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-8"
				>
					← Back to Posts
				</Link>

				{/* Post */}
				<article className="bg-white rounded-lg shadow p-8 mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
						{post.title}
					</h1>
					<p className="text-gray-700 leading-relaxed mb-6">{post.body}</p>

					<div className="flex flex-wrap gap-2 mb-6">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs"
							>
								#{tag}
							</span>
						))}
					</div>

					<div className="flex gap-4 text-sm text-gray-400 border-t pt-4">
						<span>👍 {post.reactions.likes}</span>
						<span>👎 {post.reactions.dislikes}</span>
						<span>👁️ {post.views} views</span>
					</div>
				</article>

				{/* Comments */}
				<section>
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Comments ({totalComments})
					</h2>
					<ul className="space-y-3">
						{comments.map((comment) => (
							<li key={comment.id} className="bg-white rounded-lg shadow p-5">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium text-indigo-600">
										@{comment.user.username}
									</span>
									<span className="text-xs text-gray-400">
										👍 {comment.likes}
									</span>
								</div>
								<p className="text-gray-700 text-sm">{comment.body}</p>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
}
