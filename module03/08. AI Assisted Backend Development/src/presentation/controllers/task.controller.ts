import { Request, Response } from "express";
import * as service from "../../logic/services/task.service";
import { createTaskSchema, updateTaskSchema } from "../../schemas/task.schema";

export const createTask = async (req: Request, res: Response) => {
	const parsed = createTaskSchema.parse(req.body);
	const task = await service.createTask(parsed as any);
	res.status(201).json(task);
};

export const listTasks = async (_req: Request, res: Response) => {
	const tasks = await service.listTasks();
	res.json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const task = await service.getTask(id);
	if (!task) return res.status(404).json({ message: "Task not found" });
	res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const parsed = updateTaskSchema.parse(req.body);
	const task = await service.updateTaskById(id, parsed as any);
	res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	await service.removeTask(id);
	res.status(204).send();
};
