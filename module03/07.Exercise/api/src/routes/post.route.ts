import BaseRouter from "./base.router";
import postController from "../controllers/post.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default new (class PostRoute extends BaseRouter {
	constructor() {
		super();
	}

	protected initializeRoutes(): void {
		this.router.get("/", verifyToken, postController.getAllPostsPaginated);
		this.router.post("/", verifyToken, postController.createPost);
		this.router.get("/:id", verifyToken, postController.getPostById);
		this.router.put("/:id", verifyToken, postController.updatePost);
		this.router.delete("/:id", verifyToken, postController.deletePost);
	}
})();
