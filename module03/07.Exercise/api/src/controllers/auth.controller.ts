import { NextFunction, Request, Response } from "express";
import { appErrorHandler } from "../errors/handlers/app.error.handler";
import authService from "../services/auth.service";
import { responseBuilder } from "../utils/response.helper";
import { sendEmail } from "../libs/nodemailer";

export default new (class AuthController {
	async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			await authService.signUp(req);
			await sendEmail({
				to: req.body.email,
				subject: "Welcome to Our Blog Platform!",
				href: `${process.env.CLIENT_URL}/login`,
				templateName: "welcome.hbs",
			});
			res
				.status(201)
				.send(responseBuilder(201, "User registered successfully", null));
		} catch (error) {
			appErrorHandler(error, next);
		}
	}

	async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await authService.signIn(req);
			res
				.cookie("user-token", data.token)
				.status(200)
				.send(responseBuilder(200, "User signed in successfully", data));
		} catch (error) {
			appErrorHandler(error, next);
		}
	}

	async getAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.getAuthenticatedUser(req);
			res
				.status(200)
				.send(
					responseBuilder(200, "Authenticated user fetched successfully", user)
				);
		} catch (error) {
			appErrorHandler(error, next);
		}
	}
})();
