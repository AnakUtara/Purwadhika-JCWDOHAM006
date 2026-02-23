import { PlusCircle } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "./components/shadcn-ui/input-group";
import { Card, CardContent, CardFooter } from "./components/shadcn-ui/card";
import ListItem from "./components/ui/list.item";
import { ScrollArea } from "./components/shadcn-ui/scroll-area";
import { Separator } from "./components/shadcn-ui/separator";
import { Button } from "./components/shadcn-ui/button";
import SortButtons from "./components/ui/sort.buttons";
import { Item } from "./components/shadcn-ui/item";
import { useMemo } from "react";
import useTodo from "./hooks/use-todo";

function App() {
	console.log("App component sudah di-render");
	const {
		toDoList,
		inputRef,
		handleAddToDo,
		handleToggleDone,
		handleClearCompleted,
		activeTasksCount,
	} = useTodo();

	const memoizedToDoList = useMemo(() => {
		return toDoList
			.map((todo) => (
				<ListItem key={todo.id} todo={todo} onToggleDone={handleToggleDone} />
			))
			.reverse();
	}, [toDoList, handleToggleDone]);

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
						ref={inputRef}
						placeholder="Create New To Do"
						onKeyDown={(e) => {
							const title = e.currentTarget.value.trim();
							if (e.key === "Enter" && title) {
								handleAddToDo(title);
							}
						}}
					/>
					<InputGroupAddon>
						<PlusCircle size={72} />
					</InputGroupAddon>
				</InputGroup>
				<Card className="py-0 overflow-hidden gap-0">
					<CardContent className="px-0">
						<ScrollArea className="h-64">
							{toDoList.length > 0 ? (
								memoizedToDoList
							) : (
								<p className="text-center text-gray-500">
									No tasks available yet...
								</p>
							)}
						</ScrollArea>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-between items-center py-4">
						<p className="text-xs md:text-sm text-gray-500">
							{activeTasksCount} {activeTasksCount === 1 ? "task" : "tasks"}{" "}
							remaining
						</p>
						<div className="hidden sm:block">
							<SortButtons />
						</div>
						<Button
							variant={"link"}
							className="text-xs md:text-sm text-blue-500 hover:underline p-0"
							onClick={handleClearCompleted}
						>
							Clear Completed
						</Button>
					</CardFooter>
				</Card>
				<Item
					variant={"outline"}
					className="justify-center py-1 rounded-lg sm:hidden"
				>
					<SortButtons />
					<button className="btn">Test button</button>
				</Item>
			</section>
		</>
	);
}

export default App;
