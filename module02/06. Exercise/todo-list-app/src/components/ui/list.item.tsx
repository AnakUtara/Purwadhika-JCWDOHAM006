import type { TToDo } from "@/data/todo.data";
import { Checkbox } from "../shadcn-ui/checkbox";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "../shadcn-ui/item";
import { Button } from "../shadcn-ui/button";
import { CalendarDays, Clock, X } from "lucide-react";
import ConfirmationDialog from "./confirmation.dialog";
import { useState } from "react";
import { Input } from "../shadcn-ui/input";

type Props = {
	toDo: TToDo;
	onToggleDone: (id: number) => void;
	onPressDelete: (id: number) => void;
	onEditTitle: (id: number, newTitle: string) => void;
};

const ListItem = ({
	toDo,
	onToggleDone,
	onPressDelete,
	onEditTitle,
}: Props) => {
	const { id, title, isDone } = toDo;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleStopEditing = () => {
		setIsEditing(false);
	};

	return (
		<Item variant="outline" className="rounded-none group">
			<ItemActions>
				<Checkbox checked={isDone} onCheckedChange={() => onToggleDone(id)} />
			</ItemActions>
			<ItemContent>
				{isEditing && !isDone ? (
					<Input
						aria-required
						aria-invalid={invalidTitle}
						className="mb-1 placeholder:text-destructive"
						defaultValue={title}
						autoFocus
						onBlur={handleStopEditing}
						placeholder={invalidTitle ? "Title cannot be empty" : ""}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const newTitle = e.currentTarget.value.trim();
								if (newTitle === "") {
									setInvalidTitle(true);
								} else {
									setInvalidTitle(false);
									onEditTitle(id, newTitle);
									handleStopEditing();
								}
							} else if (e.key === "Escape") {
								setInvalidTitle(false);
								handleStopEditing();
							}
						}}
					/>
				) : (
					<ItemTitle
						className={isDone ? "line-through text-neutral-500" : ""}
						onDoubleClick={handleDoubleClick}
					>
						{title}
					</ItemTitle>
				)}
				<div className="flex flex-col md:flex-row md:items-center gap-2">
					<ItemDescription className="text-xs flex items-center gap-1">
						<CalendarDays size={12} />
						{toDo.createdAt.toLocaleString("en-EN", {
							dateStyle: "medium",
							timeStyle: "short",
						})}
					</ItemDescription>
					<ItemDescription className="text-xs flex items-center gap-1">
						<Clock size={12} />
						{toDo.updatedAt.toLocaleString("en-EN", {
							dateStyle: "medium",
							timeStyle: "medium",
						})}
					</ItemDescription>
				</div>
			</ItemContent>
			<ItemActions>
				<ConfirmationDialog
					customDescription={`
						Task 
						"${title}" 
						will be deleted.
						This action cannot be undone.
						`}
					render={
						<Button
							variant={"link"}
							size={"icon-lg"}
							className="opacity-0 group-hover:opacity-50 transition-opacity duration-300 group/btn cursor-pointer"
						>
							<X className="group-hover/btn:opacity-100 transition duration-300 group-hover/btn:text-destructive" />
						</Button>
					}
					onConfirm={() => onPressDelete(id)}
				/>
			</ItemActions>
		</Item>
	);
};

export default ListItem;
