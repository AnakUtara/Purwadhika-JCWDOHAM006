import express, { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authResource: Router = express.Router();

authResource.post("/register", authController.register);
authResource.post("/login", authController.login);

export default authResource;
