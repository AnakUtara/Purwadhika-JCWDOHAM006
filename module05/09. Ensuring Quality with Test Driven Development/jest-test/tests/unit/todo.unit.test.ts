import { jest } from "@jest/globals";
import { mockDeep, mockReset } from "jest-mock-extended";
import type { PrismaClient, Todo } from "../../src/generated/prisma/client.js";
import type { TodoUpdateInput } from "../../src/generated/prisma/models.js";

const prismaMock = mockDeep<PrismaClient>();

jest.unstable_mockModule("../../src/libs/prisma.js", () => ({
	__esModule: true,
	prisma: prismaMock,
	default: prismaMock,
}));

const { default: app } = await import("../../src/app.js");
const { default: request } = await import("supertest");

beforeEach(() => {
	mockReset(prismaMock);
});

describe("GET /todos with mocked Prisma", () => {
	it("should return an array of todos", async () => {
		const mockTodos: Todo[] = [
			{
				id: 1,
				title: "Mocked Todo 1",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				title: "Mocked Todo 2",
				completed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		prismaMock.todo.findMany.mockResolvedValue(mockTodos);

		const res = await request(app).get("/todos");
		const expectedData = JSON.parse(JSON.stringify(mockTodos));

		const expectedResponse = {
			message: "Todos retrieved successfully",
			data: expectedData,
		};

		expect(res.body).toEqual(expectedResponse);
		expect(prismaMock.todo.findMany).toHaveBeenCalled();
	});
});

describe("GET /todos with mocked Prisma - filter by completed", () => {
	it("should return filtered todos based on completed status query parameter", async () => {
		const mockTodos: Todo[] = [
			{
				id: 1,
				title: "Mocked Todo 1",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				title: "Mocked Todo 2",
				completed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		const mockFiltered = mockTodos.filter((todo) => todo.completed === true);

		prismaMock.todo.findMany.mockResolvedValue(mockFiltered);

		const res = await request(app).get("/todos?completed=true");
		const expectedData = JSON.parse(JSON.stringify(mockFiltered));
		expect(res.body.data).toEqual(expectedData);
		expect(prismaMock.todo.findMany).toHaveBeenCalledWith({
			where: {
				completed: { equals: true },
			},
		});
	});
});

describe("GET /todos with mocked Prisma - filter by title (case insensitive)", () => {
	it("should return filtered todos based on title query parameter", async () => {
		const queryTitle = "mock";

		const mockTodo: Todo[] = [
			{
				id: 1,
				title: "Mocked Todo 1",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		prismaMock.todo.findMany.mockResolvedValue(mockTodo);

		const res = await request(app).get(`/todos?title=${queryTitle}`);
		const expectedData = JSON.parse(JSON.stringify(mockTodo));
		expect(res.body.data).toEqual(expectedData);
		expect(prismaMock.todo.findMany).toHaveBeenCalledWith({
			where: {
				title: { contains: queryTitle, mode: "insensitive" },
			},
		});
	});
});

describe("GET /todos/:id with mocked Prisma - not found", () => {
	it("should return 404 if todo not found", async () => {
		const id = 999;
		prismaMock.todo.findUnique.mockResolvedValue(null);

		const res = await request(app).get(`/todos/${id}`);
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Todo not found");
		expect(prismaMock.todo.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
	});
});

describe("GET /todos/:id with mocked Prisma", () => {
	it("should return a single todo by ID", async () => {
		const id = 1;
		const mockTodo: Todo = {
			id,
			title: "Mocked Todo",
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		prismaMock.todo.findUnique.mockResolvedValue(mockTodo);

		const res = await request(app).get(`/todos/${id}`);
		const expectedData = JSON.parse(JSON.stringify(mockTodo));
		expect(res.body.data).toEqual(expectedData);
		expect(prismaMock.todo.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
	});
});

describe("POST /todos with mocked Prisma", () => {
	it("should create a new todo", async () => {
		const newTodo = {
			title: "New Mocked Todo",
			completed: false,
		};

		const createdTodo: Todo = {
			id: 1,
			title: newTodo.title,
			completed: newTodo.completed,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		prismaMock.todo.create.mockResolvedValue(createdTodo);

		const res = await request(app).post("/todos").send(newTodo);
		const expectedData = JSON.parse(JSON.stringify(createdTodo));
		expect(res.body.data).toEqual(expectedData);
		expect(prismaMock.todo.create).toHaveBeenCalledWith({
			data: newTodo,
		});
	});
});

describe("PUT /todos/:id with mocked Prisma", () => {
	it("should update an existing todo", async () => {
		const id = 1;
		const updateData: TodoUpdateInput = {
			title: "Updated Mocked Todo",
			completed: false,
		};

		const existingTodo: Todo = {
			id,
			title: "Existing Mocked Todo",
			completed: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const updatedTodo: Todo = {
			id,
			title: updateData.title as string, // Use the update value
			completed: updateData.completed as boolean, // Use the update value
			createdAt: existingTodo.createdAt, // Preserve original
			updatedAt: new Date(), // Update timestamp
		};

		prismaMock.todo.findUnique.mockResolvedValue(existingTodo);
		prismaMock.todo.update.mockResolvedValue(updatedTodo);

		const res = await request(app).put(`/todos/${id}`).send(updateData);
		const expectedData = JSON.parse(JSON.stringify(updatedTodo));
		expect(res.body.data).toEqual(expectedData);
		expect(prismaMock.todo.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
		expect(prismaMock.todo.update).toHaveBeenCalledWith({
			where: { id },
			data: updateData,
		});
	});
});

describe("PUT /todos/:id with mocked Prisma - not found", () => {
	it("should return 404 if todo to update is not found", async () => {
		const id = 999;
		const updateData: TodoUpdateInput = {
			title: "Updated Mocked Todo",
			completed: false,
		};

		prismaMock.todo.findUnique.mockResolvedValue(null);

		const res = await request(app).put(`/todos/${id}`).send(updateData);
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("Todo not found");
		expect(prismaMock.todo.findUnique).toHaveBeenCalledWith({
			where: { id },
		});
		expect(prismaMock.todo.update).not.toHaveBeenCalled();
	});
});
