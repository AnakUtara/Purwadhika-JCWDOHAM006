import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import {
	postCreateSchema,
	postUpdateSchema,
} from "../validations/post.validation.js";

// Pattern-nya untuk CRUD biasanya akan memiliki 5 method utama, yaitu:
// - getMany: untuk mendapatkan banyak data sekaligus, biasanya dengan pagination, filter, dll.
// - getByID: untuk mendapatkan satu data berdasarkan ID-nya.
// - create: untuk membuat data baru.
// - update: untuk memperbarui data yang sudah ada.
// - delete: untuk menghapus data yang sudah ada. (opsional, tergantung kebutuhan aplikasi)

class PostController {
	// contoh search simple dengan 1 filter saja, yaitu title. Tapi bisa ditambah filter lain seperti content, author, dll.
	getMany = async (_req: Request, res: Response, next: NextFunction) => {
		const { search } = _req.query;
		try {
			const posts = await prisma.post.findMany({
				where: {
					title: {
						contains: search as string | undefined,
						mode: "insensitive",
					},
				},
			});

			res.send({
				message: "Posts retrieved successfully",
				data: posts,
			});
		} catch (error) {
			next(error);
		}
	};

	getByID = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		try {
			const post = await prisma.post.findUnique({
				where: { id: parseInt(id as string) },
			});

			if (!post) {
				return res.status(404).send({ message: "Post not found" });
			}

			res.send({
				message: "Post retrieved successfully",
				data: post,
			});
		} catch (error) {
			next(error);
		}
	};

	createPostForUserID = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { title, content } = req.body;

			const { id } = req.params;

			const validPost = await postCreateSchema.parseAsync({ title, content });

			const newPost = await prisma.post.create({
				data: {
					...validPost,
					authorId: parseInt(id as string),
				},
				include: { author: true },
			});

			res.status(201).send({
				message: "Post created successfully",
				data: newPost,
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const { title, content } = req.body;

			const validPost = await postUpdateSchema.parseAsync({ title, content });

			const existingPost = await prisma.post.findFirst({
				where: { id: parseInt(id as string) },
			});

			if (!existingPost) {
				res.status(404).send({ message: "Post not found" });
				return;
			}

			const updatedPost = await prisma.post.update({
				where: { id: parseInt(id as string) },
				data: {
					title: validPost.title || existingPost.title,
					content: validPost.content || existingPost.content,
				},
				include: { author: true },
			});

			res.send({
				message: "Post updated successfully",
				data: updatedPost,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default new PostController();
