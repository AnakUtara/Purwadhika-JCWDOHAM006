import postController from "../controllers/post.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import BaseRouter from "./base.router";

export default new (class AuthorRoute extends BaseRouter {
	constructor() {
		super();
	}

	protected initializeRoutes(): void {
		this.router.get(
			"/:authorId/posts",
			verifyToken,
			postController.getAllPostsByAuthorIdPaginated
		);
	}
})();
