import { Post, Prisma } from "../generated/prisma";
import prisma from "../libs/prisma/prisma.client";

export default new (class PostRepository {
	private postIncludeQuery: Prisma.PostInclude = {
		author: {
			omit: { password: true, createdAt: true, updatedAt: true },
		},
		categories: {
			omit: { postId: true, createdAt: true, updatedAt: true },
			include: {
				category: {
					omit: { createdAt: true, updatedAt: true },
				},
			},
		},
	};

	async getAllPostsPaginated(options: {
		where?: Prisma.PostWhereInput;
		skip?: number;
		take?: number;
	}): Promise<Post[]> {
		const { where, skip, take } = options;
		return prisma.post.findMany({
			where,
			orderBy: { createdAt: "desc" },
			skip,
			take,
			include: this.postIncludeQuery,
		});
	}

	async countPosts(where?: Prisma.PostWhereInput): Promise<number> {
		return prisma.post.count({ where });
	}

	async getPostBySlug(slug: string): Promise<Post | null> {
		return prisma.post.findFirst({
			where: { slug },
			include: this.postIncludeQuery,
		});
	}

	async getPostById(id: number): Promise<Post | null> {
		return prisma.post.findFirst({
			where: { id },
			include: this.postIncludeQuery,
		});
	}

	async createPost(data: Prisma.PostCreateInput): Promise<Post> {
		return prisma.post.create({ data });
	}

	async updatePost(id: number, data: Partial<Post>): Promise<Post> {
		return prisma.post.update({
			where: { id },
			data,
		});
	}

	async deletePost(id: number): Promise<Post> {
		return prisma.post.delete({ where: { id } });
	}
})();
