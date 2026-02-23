import type { TToDo } from "@/data/todo.data";
import toDoData from "@/data/todo.data";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import useAutoInputFocus from "./use-autoInputFocus";

type ToDoListState = TToDo[];

type Action =
	| { type: "Add"; payload: TToDo }
	| { type: "ToggleDone"; payload: number }
	| { type: "Delete"; payload: number }
	| { type: "ClearCompleted"; payload: null };

function reducer(state: ToDoListState, action: Action): ToDoListState {
	switch (action.type) {
		case "Add":
			return [...state, action.payload];
		case "ToggleDone":
			return state.map((todo) =>
				todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo,
			);
		case "Delete":
			return state.filter((todo) => todo.id !== action.payload);
		case "ClearCompleted":
			return state.filter((todo) => !todo.isDone);
		default:
			return state;
	}
}

const initialToDoList: ToDoListState = toDoData;

const useTodo = () => {
	const [toDoList, dispatch] = useReducer(reducer, initialToDoList);
	const inputRef = useAutoInputFocus();

	const activeTasksCount = useMemo(
		() => toDoList.filter((todo) => !todo.isDone).length,
		[toDoList],
	);

	useEffect(() => {
		const handleScroll = () => {
			console.log("Scrolling...");
		};

		window.addEventListener("scroll", handleScroll);

		document.title = `${activeTasksCount} ${activeTasksCount === 1 ? "task" : "tasks"} remaining`;
		console.log("useEffect dipanggil");

		// Cleanup Function untuk menghapus event listener saat komponen unmount atau sebelum efek dijalankan kembali
		return () => {
			window.removeEventListener("scroll", handleScroll);
			console.log("useEffect cleanup dipanggil");
		};
	}, [activeTasksCount]);

	const handleAddToDo = (title: string) => {
		const newToDo: TToDo = {
			id: toDoList.length > 0 ? toDoList[toDoList.length - 1].id + 1 : 1,
			title: title,
			isDone: false,
		};

		dispatch({ type: "Add", payload: newToDo });

		if (inputRef?.current) {
			inputRef.current.value = "";
		}
	};

	const handleToggleDone = useCallback((id: number) => {
		dispatch({ type: "ToggleDone", payload: id });
	}, []);

	const handleClearCompleted = useCallback(() => {
		dispatch({ type: "ClearCompleted", payload: null });
	}, []);

	return {
		toDoList,
		inputRef,
		dispatch,
		handleAddToDo,
		handleToggleDone,
		handleClearCompleted,
		activeTasksCount,
	};
};

export default useTodo;
