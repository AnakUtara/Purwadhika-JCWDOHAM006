import * as repo from "../../data/repositories/user.repository";
import {
	UserCreateInput,
	UserUpdateInput,
} from "../../generated/prisma/models";

export const createUser = async (payload: UserCreateInput) => {
	return repo.createUser(payload);
};

export const listUsers = async () => {
	return repo.getUsers();
};

export const getUser = async (id: number) => {
	return repo.getUserById(id);
};

export const updateUserById = async (id: number, payload: UserUpdateInput) => {
	return repo.updateUser(id, payload);
};

export const removeUser = async (id: number) => {
	return repo.deleteUser(id);
};
