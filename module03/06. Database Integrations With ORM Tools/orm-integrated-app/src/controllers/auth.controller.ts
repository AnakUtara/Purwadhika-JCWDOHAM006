import type { Request, Response, NextFunction } from "express";
import { prisma } from "../libs/prisma.client.js";
import { authSchema } from "../validations/auth.validation.js";

class AuthController {
	register = async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		try {
			const existingUser = await prisma.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				return res.status(400).send({ message: "Email already in use" });
			}

			// Contoh validasi menggunakan Zod
			// parseAsync akan melempar error jika validasi gagal,
			// yang kemudian akan ditangani oleh error handling middleware di index.ts
			// Mau pake Yup juga ga apa2. Yang penting validasi inputnya jalan.
			const validInput = await authSchema.parseAsync({ email, password });

			await prisma.user.create({
				data: validInput,
			});
			res.status(201).send({ message: "User created successfully" });
		} catch (error) {
			next(error);
		}
	};

	login = async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		try {
			const existingUser = await prisma.user.findUnique({
				where: { email },
			});

			if (!existingUser || existingUser.password !== password) {
				res.status(401).send({ message: "Invalid email or password" });
				return;
			}

			res.send({ message: "Login successful" });
		} catch (error) {
			next(error);
		}
	};
}

export default new AuthController();
