import { Prisma, User } from "../generated/prisma";
import prisma from "../libs/prisma/prisma.client";

export default new (class UserRepository {
	async getUserById(id: number) {
		return prisma.user.findUnique({ where: { id } });
	}

	async getUserByEmail(email: string) {
		return prisma.user.findUnique({ where: { email } });
	}

	async createUser(data: Prisma.UserCreateInput) {
		return prisma.user.create({ data });
	}

	async updateUser(id: number, data: Partial<User>) {
		return prisma.user.update({ where: { id }, data });
	}

	async deleteUser(id: number) {
		return prisma.user.delete({ where: { id } });
	}
})();
