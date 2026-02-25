import { PlusCircle, Search, SortAsc, SortDesc } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "./components/shadcn-ui/input-group";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "./components/shadcn-ui/card";
import ListItem from "./components/ui/list.item";
import toDoData, { type TToDo } from "./data/todo.data";
import { ScrollArea } from "./components/shadcn-ui/scroll-area";
import { Separator } from "./components/shadcn-ui/separator";
import { Item } from "./components/shadcn-ui/item";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import LinkButton from "./components/ui/link.button";
import FilterButtons from "./components/ui/filter.buttons";
import type { TFilter } from "./model/filter.type";
import { type TSort } from "./model/sort.type";
import { Toggle } from "./components/shadcn-ui/toggle";
import { Link } from "react-router";
import { useAuthUserStore } from "./lib/stores/auth-user.store";
import { Button } from "./components/shadcn-ui/button";

function App() {
	const [toDoList, setToDoList] = useState<TToDo[]>(toDoData);
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<TFilter>("all");
	const [sort, setSort] = useState<TSort>("desc");

	const mainInputRef = useRef<HTMLInputElement>(null);

	const activeTasksCount = toDoList.filter((todo) => !todo.isDone).length;
	const taskSuffix = activeTasksCount <= 1 ? "task" : "tasks";

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleFilterChange = (newFilter: TFilter) => {
		setFilter(newFilter);
	};

	const handleToggleSort = (sortType: TSort) => {
		setSort(sortType);
	};

	const handleSortList = (a: TToDo, b: TToDo) => {
		if (sort === "asc") {
			return a.createdAt.getTime() - b.createdAt.getTime();
		} else {
			return b.createdAt.getTime() - a.createdAt.getTime();
		}
	};

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
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setToDoList((prev) => [...prev, newToDo]);
		handleClearInput();
	};

	const handleEditToDoTitle = (id: number, newTitle: string) => {
		setToDoList((prev) =>
			prev.map((todo) =>
				todo.id === id
					? { ...todo, title: newTitle, updatedAt: new Date() }
					: todo,
			),
		);
	};

	const handleToggleDone = (id: number) => {
		setToDoList((prev) =>
			prev.map((todo) =>
				todo.id === id
					? { ...todo, isDone: !todo.isDone, updatedAt: new Date() }
					: todo,
			),
		);
	};

	const handleDeleteToDo = (id: number) => {
		setToDoList((prev) => prev.filter((todo) => todo.id !== id));
	};

	const handleClearCompleted = () => {
		setToDoList((prev) => prev.filter((todo) => !todo.isDone));
	};

	const { userState, signOut } = useAuthUserStore();

	return (
		<>
			<div className="relative -z-10 flex h-72 bg-[url(https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg)] bg-cover">
				<div className="absolute inset-0 bg-purple-400/50"></div>
			</div>

			<section className="relative -mt-60 mb-8 mx-auto w-2xl flex gap-8 flex-col p-4 max-w-sm md:max-w-md md:p-0 lg:max-w-lg lg:p-0">
				<div>
					<Link to={"/login"}>
						<h1 className="text-4xl text-white font-bold tracking-widest">
							T O D O
						</h1>
					</Link>

					{userState ? (
						<div className="flex flex-col items-start gap-2 mt-2">
							<p className="text-muted">Welcome, {userState.email}</p>
							<Button onClick={signOut}>Sign Out</Button>
						</div>
					) : null}
				</div>
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
				<Card className="pb-0 overflow-hidden gap-0">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between gap-2">
							<InputGroup>
								<InputGroupInput
									value={search}
									placeholder="Search..."
									onChange={handleSearchChange}
								/>
								<InputGroupAddon>
									<Search />
								</InputGroupAddon>
							</InputGroup>
							<Toggle
								value={sort}
								aria-label="Sort"
								onClick={() =>
									handleToggleSort(sort === "asc" ? "desc" : "asc")
								}
							>
								{sort === "asc" ? <SortAsc /> : <SortDesc />}
								Sort
							</Toggle>
						</div>
					</CardHeader>
					<Separator />
					<CardContent className="px-0">
						<ScrollArea className="h-96">
							{toDoList.length > 0 ? (
								toDoList
									.filter((todo) => {
										switch (filter) {
											case "active":
												return !todo.isDone;
											case "completed":
												return todo.isDone;
											default:
												return true;
										}
									})
									.filter((todo) =>
										todo.title.toLowerCase().includes(search.toLowerCase()),
									)
									.sort(handleSortList)
									.map((todo) => (
										<ListItem
											key={todo.id}
											toDo={todo}
											onToggleDone={handleToggleDone}
											onPressDelete={handleDeleteToDo}
											onEditTitle={handleEditToDoTitle}
										/>
									))
							) : (
								<p className="text-center text-gray-500 pt-10">
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
							<FilterButtons onChangeFilter={handleFilterChange} />
						</div>
						<LinkButton text="Clear Completed" onClick={handleClearCompleted} />
					</CardFooter>
				</Card>
				<Item
					variant={"outline"}
					className="justify-center py-1 rounded-lg md:hidden"
				>
					<FilterButtons onChangeFilter={handleFilterChange} />
				</Item>
			</section>
		</>
	);
}

export default App;
