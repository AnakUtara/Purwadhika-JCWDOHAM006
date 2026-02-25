export type TToDo = {
	id: number;
	title: string;
	isDone: boolean;
	createdAt: Date;
	updatedAt: Date;
};

const toDoData: TToDo[] = [
	{
		id: 1,
		title: "Jog around the park 3x",
		isDone: true,
		createdAt: new Date("2026-01-01T09:00:00"),
		updatedAt: new Date("2026-01-01T09:00:00"),
	},
	{
		id: 2,
		title: "10 minutes meditation",
		isDone: false,
		createdAt: new Date("2026-01-02T10:00:00"),
		updatedAt: new Date("2026-01-02T10:00:00"),
	},
	{
		id: 3,
		title: "Read for 1 hour",
		isDone: false,
		createdAt: new Date("2026-01-03T11:00:00"),
		updatedAt: new Date("2026-01-03T11:00:00"),
	},
	{
		id: 4,
		title: "Pick up groceries",
		isDone: false,
		createdAt: new Date("2026-01-04T12:00:00"),
		updatedAt: new Date("2026-01-04T12:00:00"),
	},
	{
		id: 5,
		title: "Complete Todo App on Frontend Mentor",
		isDone: false,
		createdAt: new Date("2026-01-05T13:00:00"),
		updatedAt: new Date("2026-01-05T13:00:00"),
	},
];

export default toDoData;
