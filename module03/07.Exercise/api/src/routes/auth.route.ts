import authController from "../controllers/auth.controller";
import { uniqueUserGuard, verifyToken } from "../middlewares/auth.middleware";
import BaseRouter from "./base.router";

export default new (class AuthRoute extends BaseRouter {
	constructor() {
		super();
	}

	protected initializeRoutes(): void {
		this.router.post("/sign-in", authController.signIn);
		this.router.post("/sign-up", uniqueUserGuard, authController.signUp);
		this.router.get("/user", verifyToken, authController.getAuthenticatedUser);
	}
})();
