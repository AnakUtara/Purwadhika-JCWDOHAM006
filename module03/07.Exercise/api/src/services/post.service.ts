import { Request } from "express";
import postRepository from "../repositories/post.repository";
import { Post, Prisma } from "../generated/prisma";
import {
	createPostSchema,
	updatePostSchema,
} from "../validations/posts.validation";
import AppError from "../errors/app.error";

export default new (class PostService {
	private postRepo = postRepository;
	private pageNumber = (page: number) => Math.max(Number(page) || 1, 1);
	private showNumber = (show: number) => Math.max(Number(show) || 10, 1);

	private buildWhere(req: Request): Prisma.PostWhereInput {
		const { search, category } = req.query;
		return {
			...(search && {
				OR: [
					{ title: { contains: String(search), mode: "insensitive" } },
					{ excerpt: { contains: String(search), mode: "insensitive" } },
				],
			}),
			...(category && {
				categories: {
					some: {
						category: {
							name: { contains: String(category), mode: "insensitive" },
						},
					},
				},
			}),
		};
	}

	async getAllPostsPaginated(req: Request) {
		const { page, show } = req.query;
		const where = this.buildWhere(req);

		const posts = await this.postRepo.getAllPostsPaginated({
			where,
			skip: (this.pageNumber(Number(page)) - 1) * this.showNumber(Number(show)),
			take: this.showNumber(Number(show)),
		});

		const totalPages = Math.ceil(
			(await this.postRepo.countPosts(where)) / this.showNumber(Number(show))
		);

		return { posts, totalPages };
	}

	async getAllPostsByAuthorId(req: Request) {
		const { authorId } = req.params;
		if (!authorId) throw new AppError("Author ID is required", 400);
		if (authorId !== String(req.user?.id))
			throw new AppError("You are not authorized to access these posts", 403);
		const { page, show } = req.query;
		const posts = await this.postRepo.getAllPostsPaginated({
			where: { ...this.buildWhere(req), authorId: Number(authorId) },
			skip: (this.pageNumber(Number(page)) - 1) * this.showNumber(Number(show)),
			take: this.showNumber(Number(show)),
		});
		const totalPages = Math.ceil(
			(await this.postRepo.countPosts({ authorId: Number(authorId) })) /
				this.showNumber(Number(show))
		);
		return { posts, totalPages };
	}

	async getPostById(req: Request) {
		const { id } = req.params;
		const post = await this.postRepo.getPostById(Number(id));
		return post;
	}

	async getPostBySlug(req: Request) {
		const { slug } = req.params;
		const post = await this.postRepo.getPostBySlug(slug);
		return post;
	}

	async createPost(req: Request) {
		const submittedPost: Post = req.body;
		if (!req.body) throw new AppError("Request body is missing", 400);
		const validNewPost = await createPostSchema.validate(submittedPost);
		const newPost: Post = await postRepository.createPost({
			...validNewPost,
			author: { connect: { id: req.user!.id } },
			categories:
				validNewPost.categories && validNewPost.categories.length > 0
					? {
							connect:
								validNewPost.categories as Prisma.PostCategoryWhereUniqueInput[],
					  }
					: undefined,
		});
		// Update slug to include post ID for uniqueness
		const updatedSlug = await postRepository.updatePost(newPost.id, {
			slug: `${validNewPost.slug}-${newPost.id}`,
		});

		return updatedSlug;
	}

	async updatePost(req: Request) {
		const { id } = req.params;
		const submittedPost: Post = req.body;
		if (!req.body) throw new AppError("Request body is missing", 400);
		const validUpdate = await updatePostSchema.validate(submittedPost);

		// If title or slug is being updated, regenerate slug
		let newSlug = validUpdate.slug;
		if (validUpdate.title) {
			// Generate slug from title (e.g., kebab-case)
			newSlug = `${validUpdate.title.replace(/\s+/g, "-").toLowerCase()}-${id}`;
		}

		const updatedPost = await postRepository.updatePost(Number(id), {
			...validUpdate,
			...(newSlug && { slug: newSlug }),
		});
		return updatedPost;
	}

	async deletePost(req: Request) {
		const { id } = req.params;
		await postRepository.deletePost(Number(id));
	}
})();
