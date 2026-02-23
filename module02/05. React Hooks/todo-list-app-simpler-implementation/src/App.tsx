import { PlusCircle } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "./components/shadcn-ui/input-group";
import { Card, CardContent, CardFooter } from "./components/shadcn-ui/card";
import ListItem from "./components/ui/list.item";
import toDoData, { type TToDo } from "./data/todo.data";
import { ScrollArea } from "./components/shadcn-ui/scroll-area";
import { Separator } from "./components/shadcn-ui/separator";
import { Item } from "./components/shadcn-ui/item";
import { useEffect, useRef, useState } from "react";
import LinkButton from "./components/ui/link.button";
import FilterButtons from "./components/ui/filter.buttons";

function App() {
	const [toDoList, setToDoList] = useState<TToDo[]>(toDoData);

	const mainInputRef = useRef<HTMLInputElement>(null);

	const activeTasksCount = toDoList.filter((todo) => !todo.isDone).length;
	const taskSuffix = activeTasksCount === 1 ? "task" : "tasks";

	const handleFocusInput = () => {
		mainInputRef.current?.focus();
	};

	const handleClearInput = () => {
		if (mainInputRef.current) {
			mainInputRef.current.value = "";
		}
	};

	useEffect(() => {
		handleFocusInput();
	}, []);

	useEffect(() => {
		document.title = `T O D O | ${activeTasksCount} ${taskSuffix} remaining`;
	}, [activeTasksCount, taskSuffix]);

	const handleAddToDo = (title: string) => {
		const newToDo: TToDo = {
			id: toDoList.length > 0 ? toDoList[toDoList.length - 1].id + 1 : 1,
			title: title,
			isDone: false,
		};
		setToDoList((prev) => [...prev, newToDo]);
		handleClearInput();
	};

	const handleToggleDone = (id: number) => {
		setToDoList((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
			),
		);
	};

	const handleDeleteToDo = (id: number) => {
		setToDoList((prev) => prev.filter((todo) => todo.id !== id));
	};

	const handleClearCompleted = () => {
		setToDoList((prev) => prev.filter((todo) => !todo.isDone));
	};

	return (
		<>
			<div className="relative -z-10 flex h-72 bg-[url(https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg)] bg-cover">
				<div className="absolute inset-0 bg-purple-400/50"></div>
			</div>

			<section className="relative -mt-60 mx-auto w-2xl flex gap-10 flex-col p-4 max-w-sm md:max-w-md md:p-0 lg:max-w-lg lg:p-0">
				<h1 className="text-4xl text-white font-bold tracking-widest">
					T O D O
				</h1>
				<InputGroup className="w-full bg-white h-12">
					<InputGroupInput
						placeholder="Create New To Do"
						ref={mainInputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter" && mainInputRef.current) {
								handleAddToDo(mainInputRef.current.value);
							}
						}}
					/>
					<InputGroupAddon>
						<PlusCircle size={72} />
					</InputGroupAddon>
				</InputGroup>
				<Card className="py-0 overflow-hidden gap-0">
					<CardContent className="px-0">
						<ScrollArea className="h-96">
							{toDoList.length > 0 ? (
								toDoList
									.map((todo) => (
										<ListItem
											key={todo.id}
											toDo={todo}
											onToggleDone={() => handleToggleDone(todo.id)}
											onPressX={() => handleDeleteToDo(todo.id)}
										/>
									))
									.reverse()
							) : (
								<p className="text-center text-gray-500">
									No tasks available yet...
								</p>
							)}
						</ScrollArea>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-between items-center py-4">
						<p className="text-xs lg:text-sm text-gray-500">
							{activeTasksCount} {taskSuffix} remaining
						</p>
						<div className="hidden md:block">
							<FilterButtons />
						</div>
						<LinkButton text="Clear Completed" onClick={handleClearCompleted} />
					</CardFooter>
				</Card>
				<Item
					variant={"outline"}
					className="justify-center py-1 rounded-lg md:hidden"
				>
					<FilterButtons />
				</Item>
			</section>
		</>
	);
}

export default App;
