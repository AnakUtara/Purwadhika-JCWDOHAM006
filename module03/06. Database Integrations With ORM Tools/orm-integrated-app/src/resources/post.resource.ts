import express, { Router } from "express";
import postController from "../controllers/post.controller.js";

const postResource: Router = express.Router();

postResource.get("/", postController.getMany);
postResource.get("/:id", postController.getByID);
postResource.post("/users/:id", postController.createPostForUserID);
postResource.patch("/:id", postController.update);

export default postResource;
