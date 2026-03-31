import { Request, Response, NextFunction } from "express";
import * as authService from "../../logic/services/auth.service";
import { registerSchema, loginSchema } from "../../schemas/auth.schema";

const COOKIE_NAME = "refreshToken";

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const payload = registerSchema.parse(req.body);
		const user = await authService.register(payload);
		// don't return password/refreshToken
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, refreshToken, ...safe } = user as any;
		res.status(201).json(safe);
	} catch (err) {
		next(err);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const payload = loginSchema.parse(req.body);
		const { accessToken, refreshToken } = await authService.login(payload);
		res.cookie(COOKIE_NAME, refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/api/auth/refresh",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} catch (err) {
		next(err);
	}
};

export const refresh = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies[COOKIE_NAME];
		if (!token) return res.status(401).json({ message: "No refresh token" });
		const { accessToken, refreshToken } = await authService.refresh(token);
		res.cookie(COOKIE_NAME, refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/api/auth/refresh",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} catch (err) {
		next(err);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies[COOKIE_NAME] || null;
		await authService.logout(token);
		res.clearCookie(COOKIE_NAME, { path: "/api/auth/refresh" });
		res.status(204).send();
	} catch (err) {
		next(err);
	}
};
