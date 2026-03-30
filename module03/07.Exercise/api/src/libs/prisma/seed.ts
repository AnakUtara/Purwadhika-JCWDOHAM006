import { hashPassword } from "../bcrypt";
import prisma from "./prisma.client";

async function main() {
	// Helper to create posts and update slugs
	async function createUserWithPosts(
		email: string,
		password: string,
		postDatas: any[]
	) {
		const user = await prisma.user.create({
			data: { email, password },
		});

		for (const postData of postDatas) {
			// Create post with temporary slug
			const createdPost = await prisma.post.create({
				data: {
					...postData,
					slug: postData.slug, // temporary slug
					author: { connect: { id: user.id } },
				},
			});
			// Update slug to include post ID for uniqueness
			await prisma.post.update({
				where: { id: createdPost.id },
				data: { slug: `${postData.slug}-${createdPost.id}` },
			});
		}
	}

	await createUserWithPosts(
		"author01@example.com",
		await hashPassword("password"),
		[
			{
				title: "First Post by Author 01",
				slug: "first-post-by-author-01",
				excerpt: "Excerpt for first post.",
				content: "Content for first post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [
						{ category: { create: { name: "news" } } },
						{ category: { create: { name: "entertainment" } } },
					],
				},
			},
			{
				title: "Second Post by Author 01",
				slug: "second-post-by-author-01",
				excerpt: "Excerpt for second post.",
				content: "Content for second post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [{ category: { create: { name: "technology" } } }],
				},
			},
			{
				title: "Third Post by Author 01",
				slug: "third-post-by-author-01",
				excerpt: "Excerpt for third post.",
				content: "Content for third post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [{ category: { create: { name: "lifestyle" } } }],
				},
			},
		]
	);

	await createUserWithPosts(
		"author02@example.com",
		await hashPassword("password"),
		[
			{
				title: "First Post by Author 02",
				slug: "first-post-by-author-02",
				excerpt: "Excerpt for first post.",
				content: "Content for first post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [{ category: { create: { name: "travel" } } }],
				},
			},
			{
				title: "Second Post by Author 02",
				slug: "second-post-by-author-02",
				excerpt: "Excerpt for second post.",
				content: "Content for second post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [{ category: { create: { name: "food" } } }],
				},
			},
			{
				title: "Third Post by Author 02",
				slug: "third-post-by-author-02",
				excerpt: "Excerpt for third post.",
				content: "Content for third post.",
				imageUrl: "https://via.placeholder.com/150",
				categories: {
					create: [{ category: { create: { name: "sports" } } }],
				},
			},
		]
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
