import {
	TaskCreateInput,
	TaskUpdateInput,
} from "../../generated/prisma/models";
import { prisma } from "../prismaClient";
import { Task } from "@prisma/client";

export const createTask = async (data: TaskCreateInput): Promise<Task> => {
	return prisma.task.create({ data });
};

export const getTasks = async (): Promise<Task[]> => {
	return prisma.task.findMany({ include: { user: true } });
};

export const getTaskById = async (id: number): Promise<Task | null> => {
	return prisma.task.findUnique({ where: { id }, include: { user: true } });
};

export const updateTask = async (
	id: number,
	data: TaskUpdateInput,
): Promise<Task> => {
	return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: number): Promise<Task> => {
	return prisma.task.delete({ where: { id } });
};
