import { Router } from "express";
import * as controller from "../controllers/task.controller";

const router = Router();

router.post("/", controller.createTask);
router.get("/", controller.listTasks);
router.get("/:id", controller.getTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;
