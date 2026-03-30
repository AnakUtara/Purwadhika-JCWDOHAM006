import storageController from "../controllers/storage.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { uploader } from "../middlewares/express/multer";
import BaseRouter from "./base.router";

export default new (class StorageRoute extends BaseRouter {
	constructor() {
		super();
	}

	protected initializeRoutes(): void {
		this.router.post(
			"/image",
			verifyToken,
			uploader("IMG", "images", ["image/png", "image/jpeg"]).single("image"),
			storageController.getFilename
		);
	}
})();
