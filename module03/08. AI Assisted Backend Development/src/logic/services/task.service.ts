import * as repo from "../../data/repositories/task.repository";
import {
	TaskCreateInput,
	TaskUpdateInput,
} from "../../generated/prisma/models";

export const createTask = async (payload: TaskCreateInput) => {
	return repo.createTask(payload);
};

export const listTasks = async () => {
	return repo.getTasks();
};

export const getTask = async (id: number) => {
	return repo.getTaskById(id);
};

export const updateTaskById = async (id: number, payload: TaskUpdateInput) => {
	return repo.updateTask(id, payload);
};

export const removeTask = async (id: number) => {
	return repo.deleteTask(id);
};
