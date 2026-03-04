import express, { Request, Response } from "express";
import todos from "./data/todos.json";
import * as fs from "node:fs/promises";
import IToDo from "./model/todo.model";

const PORT: number = 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));

const todosPath = "./src/data/todos.json";

const assignID = (): number => {
	return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
};

const findTodoByID = (id: number): IToDo | undefined => {
	return todos.find((todo) => todo.id === id);
};

app.get("/", (_req: Request, res: Response) => {
	res.send("Welcome to simple express REST API!");
});

app.get("/todos", (_req: Request, res: Response) => {
	res.send(todos);
});

app.get("/todos/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const todo: IToDo | undefined = findTodoByID(parseInt(id as string));

	if (!todo) {
		res.status(404).send({ message: `Todo with id ${id} not found` });
	} else {
		res.send(todo);
	}
});

app.post("/todos", async (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({ message: "Body is required" });
		return;
	}

	const { title } = req.body;

	const newTodo: IToDo = {
		id: assignID(),
		title,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	try {
		await fs.writeFile(todosPath, JSON.stringify([...todos, newTodo], null, 2));
	} catch (error) {
		res.status(500).send({ message: "Failed to create new todo", error });
		return;
	}

	res
		.status(201)
		.send({ message: "Create new todo successfully", todo: newTodo });
});

app.put("/todos/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, completed } = req.body;

	const todo: IToDo | undefined = findTodoByID(parseInt(id as string));

	if (!todo) {
		res.status(404).send({ message: `Todo with id ${id} not found` });
		return;
	}

	const updatedTodo: IToDo = {
		...todo,
		title: title || todo.title,
		completed: Boolean(completed) || todo.completed,
		updatedAt: new Date().toISOString(),
	};
	try {
		await fs.writeFile(
			todosPath,
			JSON.stringify(
				todos.map((todo) => {
					if (todo.id === parseInt(id as string)) {
						return updatedTodo;
					} else {
						return todo;
					}
				}),
				null,
				2,
			),
		);
	} catch (error) {
		res.status(500).send({ message: "Failed to update todo", error });
		return;
	}

	res.send({
		message: `Update todo with id ${id} successfully`,
		todo: updatedTodo,
	});
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
	const { id } = req.params;

	const todo: IToDo | undefined = findTodoByID(parseInt(id as string));

	if (!todo) {
		res.status(404).send({ message: `Todo with id ${id} not found` });
		return;
	}

	try {
		await fs.writeFile(
			todosPath,
			JSON.stringify(
				todos.filter((todo) => todo.id !== parseInt(id as string)),
				null,
				2,
			),
		);
	} catch (error) {
		res.status(500).send({ message: "Failed to delete todo", error });
		return;
	}

	res.send({ message: `Delete todo with id ${id} successfully` });
});

app.listen(PORT, () => {
	console.log(`Application is running on port: ${PORT}`);
});
