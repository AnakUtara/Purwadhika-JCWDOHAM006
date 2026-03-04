import express from "express";
import type { Request, Response } from "express";
import todos from "./data/todos.json";
import fs from "fs/promises";
import type ITodo from "./model/todo.model.js";

const PORT = 8000;

const todosPath = "./src/data/todos.json";

function assignID(): number {
	return todos.length > 0 ? (todos[todos.length - 1] || { id: 0 }).id + 1 : 1;
}

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
	res.send("Welcome to your first Express REST API!");
});

app.get("/random", (_req: Request, res: Response) => {
	const randomNumber = Math.floor(Math.random() * 100) + 1;
	res.send({ randomNumber });
});

app.get("/todos", (_req: Request, res: Response) => {
	res.send(todos);
});

app.get("/todos/:id", (req: Request, res: Response) => {
	const { id } = req.params;

	const todo = todos.find((todo) => todo.id === parseInt(id as string));

	if (!todo) {
		res.status(404).send({ message: `Todo with id: ${id} not found` });
	} else {
		res.send({ message: `Todo with id: ${id} found`, todo });
	}
});

app.post("/todos", async (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({ message: "Body is required" });
		return;
	}

	const { title } = req.body;
	const newTodo: ITodo = {
		id: assignID(),
		title,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	try {
		await fs.writeFile(todosPath, JSON.stringify([...todos, newTodo], null, 2));
		res
			.status(201)
			.send({ message: "New todo created successfully", data: newTodo });
	} catch (error) {
		res.status(500).send({ message: "Failed to create new todo", error });
	}
});

app.listen(PORT, () => {
	console.log(`Application is running on port: ${PORT}`);
});
