import request from "supertest";
import app from "../../src/app.js";

describe("GET /todos", () => {
	it("should return an array of todos", async () => {
		const res = await request(app).get("/todos");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Todos retrieved successfully",
			data: expect.arrayOf(
				expect.objectContaining({
					id: expect.any(Number),
					title: expect.any(String),
					completed: expect.any(Boolean),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				}),
			),
		});
	});
});

describe("GET /todos/:id", () => {
	it("should return a single todo", async () => {
		const id = 2;
		const res = await request(app).get(`/todos/${id}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Todo retrieved successfully",
			data: expect.objectContaining({
				id: expect.any(Number),
				title: expect.any(String),
				completed: expect.any(Boolean),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			}),
		});
	});
});

describe("GET /todos/:id with non-existing id", () => {
	it("should return 404", async () => {
		const id = 999;
		const res = await request(app).get(`/todos/${id}`);
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({
			message: "Todo not found",
		});
	});
});

// describe("POST /todos", () => {
// 	it("should create a new todo", async () => {
// 		const newTodo = {
// 			title: "New Todo 2",
// 			completed: false,
// 		};
// 		const res = await request(app).post("/todos").send(newTodo);
// 		expect(res.statusCode).toEqual(201);
// 		expect(res.body).toEqual({
// 			message: "Todo created successfully",
// 			data: expect.objectContaining({
// 				id: expect.any(Number),
// 				title: newTodo.title,
// 				completed: newTodo.completed,
// 				createdAt: expect.any(String),
// 				updatedAt: expect.any(String),
// 			}),
// 		});
// 	});
// });
