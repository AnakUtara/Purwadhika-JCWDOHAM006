import {
	UserCreateInput,
	UserUpdateInput,
} from "../../generated/prisma/models";
import { prisma } from "../prismaClient";
import { User } from "@prisma/client";

export const createUser = async (data: UserCreateInput): Promise<User> => {
	return prisma.user.create({ data });
};

export const getUsers = async (): Promise<User[]> => {
	return prisma.user.findMany({ include: { tasks: true } });
};

export const getUserById = async (id: number): Promise<User | null> => {
	return prisma.user.findUnique({ where: { id }, include: { tasks: true } });
};

export const updateUser = async (
	id: number,
	data: UserUpdateInput,
): Promise<User> => {
	return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number): Promise<User> => {
	return prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	return prisma.user.findUnique({ where: { email } });
};

export const setRefreshToken = async (userId: number, token: string | null) => {
	return prisma.user.update({
		where: { id: userId },
		data: { refreshToken: token },
	});
};

export const clearRefreshToken = async (userId: number) => {
	return prisma.user.update({
		where: { id: userId },
		data: { refreshToken: null },
	});
};
