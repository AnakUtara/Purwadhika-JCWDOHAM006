import type { TToDo } from "@/data/todo.data";
import { Checkbox } from "../shadcn-ui/checkbox";
import { Item, ItemActions, ItemContent, ItemTitle } from "../shadcn-ui/item";
import { memo, useEffect } from "react";

type Props = {
	todo: TToDo;
	onToggleDone: (id: number) => void;
};

const ListItem = ({ todo, onToggleDone }: Props) => {
	useEffect(() => {
		console.log(`🟢 ListItem dengan id ${todo.id} sudah di-render`);
		return () => {
			console.log(`🔴 ListItem dengan id ${todo.id} akan di-unmount`);
		};
	}, [todo.id]);

	console.log("ListItem dengan id " + todo.id + " sedang di-render");

	return (
		<Item variant="outline" className="rounded-none">
			<ItemActions>
				<Checkbox
					checked={todo.isDone}
					onCheckedChange={() => {
						onToggleDone(todo.id);
					}}
				/>
			</ItemActions>
			<ItemContent>
				<ItemTitle
					className={todo.isDone ? "line-through text-neutral-500" : ""}
				>
					{todo.title}
				</ItemTitle>
			</ItemContent>
		</Item>
	);
};

export default memo(ListItem);
