import { NextFunction, Request, Response } from "express";
import { appErrorHandler } from "../errors/handlers/app.error.handler";
import { responseBuilder } from "../utils/response.helper";

export default new (class StorageController {
	async getFilename(req: Request, res: Response, next: NextFunction) {
		try {
			const { file } = req;
			if (!file) {
				return res.status(400).send({ message: "No file uploaded" });
			}
			return res
				.status(200)
				.send(
					responseBuilder(200, "File uploaded successfully", {
						filename: file.filename,
					})
				);
		} catch (error) {
			appErrorHandler(error, next);
		}
	}
})();
