import { defineConfig } from "prisma/config";

export default defineConfig({
	migrations: {
		seed: "ts-node-dev src/libs/prisma/seed.ts",
	},
});
