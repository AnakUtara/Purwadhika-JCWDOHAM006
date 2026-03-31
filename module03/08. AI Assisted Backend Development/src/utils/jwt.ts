import jwt from "jsonwebtoken";

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret";

export const signAccessToken = (payload: object) => {
	return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
};

export const signRefreshToken = (payload: object) => {
	return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, REFRESH_SECRET) as any;
};
