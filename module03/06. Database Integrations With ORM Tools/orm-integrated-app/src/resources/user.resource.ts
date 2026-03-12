import express, { Router } from "express";
import userController from "../controllers/user.controller.js";

const userResource: Router = express.Router();

userResource.get("/", userController.getMany);
userResource.get("/:id", userController.getByID);
userResource.patch("/:id", userController.update);
userResource.get("/:id/posts", userController.getPostsByUserID);

export default userResource;
