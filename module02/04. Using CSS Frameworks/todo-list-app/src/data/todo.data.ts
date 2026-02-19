type TToDo = {
	id: number;
	title: string;
	isDone?: boolean; // Optional property to indicate if the task is active or completed
};

const toDoData: TToDo[] = [
	{
		id: 1,
		title: "Jog around the park 3x",
		isDone: true,
	},
	{
		id: 2,
		title: "10 minutes meditation",
		isDone: false,
	},
	{
		id: 3,
		title: "Read for 1 hour",
		isDone: false,
	},
	{
		id: 4,
		title: "Pick up groceries",
		isDone: false,
	},
	{
		id: 5,
		title: "Complete Todo App on Frontend Mentor",
		isDone: false,
	},
];

export default toDoData;
