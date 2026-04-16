import express, {} from "express";
import { imageUploader } from "../middlewares/express/multer.js";
import processorController from "../controllers/processor.controller.js";
export const processorRouter = express.Router();
processorRouter.post("/image", imageUploader(50).single("file"), processorController.compressImageAndSendWithEmail);
