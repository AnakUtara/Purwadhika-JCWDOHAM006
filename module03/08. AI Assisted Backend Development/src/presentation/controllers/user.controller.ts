import { Request, Response } from "express";
import * as service from "../../logic/services/user.service";
import { createUserSchema, updateUserSchema } from "../../schemas/user.schema";

export const createUser = async (req: Request, res: Response) => {
	const parsed = createUserSchema.parse(req.body);
	const user = await service.createUser(parsed as any);
	res.status(201).json(user);
};

export const listUsers = async (_req: Request, res: Response) => {
	const users = await service.listUsers();
	res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const user = await service.getUser(id);
	if (!user) return res.status(404).json({ message: "User not found" });
	res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const parsed = updateUserSchema.parse(req.body);
	const user = await service.updateUserById(id, parsed as any);
	res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	await service.removeUser(id);
	res.status(204).send();
};
