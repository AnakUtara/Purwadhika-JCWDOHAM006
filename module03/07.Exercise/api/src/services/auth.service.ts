import { Request } from "express";
import userRepository from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../libs/bcrypt";
import { authSchema } from "../validations/auth.validation";
import AppError from "../errors/app.error";
import { generateJWT } from "../libs/jwt";

export default new (class AuthService {
	async signUp(req: Request) {
		const { email, password } = req.body;

		const validUser = await authSchema.validate({ email, password });

		const hashedPassword = await hashPassword(validUser.password);
		if (!hashedPassword) throw new AppError("Password hashing failed", 500);

		await userRepository.createUser({ ...validUser, password: hashedPassword });
	}

	async signIn(req: Request) {
		const { email, password } = req.body;

		const user = await userRepository.getUserByEmail(email);
		if (!user) throw new AppError("Invalid email or password", 401);

		const isValidPassword = await comparePassword(password, user.password);
		if (!isValidPassword) throw new AppError("Invalid email or password", 401);

		const jwt = generateJWT({ id: user.id, email: user.email });
		if (!jwt) throw new AppError("Failed to generate token", 500);

		const { password: _, ...safeUser } = user;

		return { token: jwt, user: safeUser };
	}

	async getAuthenticatedUser(req: Request) {
		const userId = req.user?.id;
		if (!userId) throw new AppError("User ID not found in request", 400);

		const user = await userRepository.getUserById(userId);
		if (!user) throw new AppError("User not found", 404);

		const { password: _, ...safeUser } = user;
		return safeUser;
	}
})();
