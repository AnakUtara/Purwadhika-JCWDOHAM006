import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import type { User } from "../generated/prisma/client.js";

class UserController {
	getMany = async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await prisma.user.findMany({
				include: {
					posts: true,
				},
				// biasanya password selalu di-omit/disembunyiin karena sifatnya yang sensitif.
				omit: {
					password: true,
				},
			});
			res.send({
				message: "Users retrieved successfully",
				data: users,
			});
		} catch (error) {
			next(error);
		}
	};

	getByID = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			const user = await prisma.user.findUnique({
				where: { id: parseInt(id as string) },
				omit: {
					password: true,
				},
			});
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.send({
				message: "User retrieved successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	};

	getPostsByUserID = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id } = req.params;
		try {
			const userWithPosts = await prisma.user.findUnique({
				where: { id: parseInt(id as string) },
				include: { posts: true },
				omit: {
					password: true,
				},
			});
			if (!userWithPosts) {
				return res.status(404).send({ message: "User not found" });
			}
			res.send({
				message: "User's posts retrieved successfully",
				data: userWithPosts.posts,
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { email, name } = req.body;
		try {
			const existingUser: User | null = await prisma.user.findUnique({
				where: { id: parseInt(id as string) },
			});

			if (!existingUser) {
				return res.status(404).send({ message: "User not found" });
			}

			await prisma.user.update({
				where: { id: parseInt(id as string) },
				data: {
					email: email || existingUser?.email,
					name: name || existingUser?.name,
				},
				omit: {
					password: true,
				},
			});

			res.send({ message: "User updated successfully" });
		} catch (error) {
			next(error);
		}
	};
}

export default new UserController();
