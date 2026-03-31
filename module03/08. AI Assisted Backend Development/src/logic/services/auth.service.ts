import * as userRepo from "../../data/repositories/user.repository";
import { hashPassword, verifyPassword } from "../../utils/hash";
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../utils/jwt";

export const register = async (payload: {
	name?: string;
	email: string;
	password: string;
}) => {
	const existing = await userRepo.getUserByEmail(payload.email);
	if (existing) throw new Error("Email already in use");
	const hashed = await hashPassword(payload.password);
	const user = await userRepo.createUser({
		name: payload.name,
		email: payload.email,
		password: hashed,
	} as any);
	return user;
};

export const login = async (payload: { email: string; password: string }) => {
	const user = await userRepo.getUserByEmail(payload.email);
	if (!user) throw new Error("Invalid credentials");
	const ok = await verifyPassword(payload.password, user.password);
	if (!ok) throw new Error("Invalid credentials");

	const accessToken = signAccessToken({ userId: user.id });
	const refreshToken = signRefreshToken({ userId: user.id });

	await userRepo.setRefreshToken(user.id, refreshToken);

	return { accessToken, refreshToken, user };
};

export const refresh = async (token: string) => {
	const decoded = verifyRefreshToken(token);
	const userId = decoded.userId as number;
	const user = await userRepo.getUserById(userId);
	if (!user || !user.refreshToken) throw new Error("Invalid token");
	if (user.refreshToken !== token) throw new Error("Invalid token");

	const accessToken = signAccessToken({ userId: user.id });
	const newRefresh = signRefreshToken({ userId: user.id });
	await userRepo.setRefreshToken(user.id, newRefresh);

	return { accessToken, refreshToken: newRefresh };
};

export const logout = async (token: string | null) => {
	if (!token) return;
	try {
		const decoded = verifyRefreshToken(token);
		const userId = decoded.userId as number;
		await userRepo.clearRefreshToken(userId);
	} catch (e) {
		// ignore
	}
};
