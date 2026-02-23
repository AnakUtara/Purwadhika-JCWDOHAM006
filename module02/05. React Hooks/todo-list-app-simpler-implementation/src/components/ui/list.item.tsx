import type { TToDo } from "@/data/todo.data";
import { Checkbox } from "../shadcn-ui/checkbox";
import { Item, ItemActions, ItemContent, ItemTitle } from "../shadcn-ui/item";
import { Button } from "../shadcn-ui/button";
import { X } from "lucide-react";
import ConfirmationDialog from "./confirmation.dialog";

type Props = {
	toDo: TToDo;
	onToggleDone: (id: number) => void;
	onPressDelete: (id: number) => void;
};

const ListItem = ({ toDo, onToggleDone, onPressDelete }: Props) => {
	const { id, title, isDone } = toDo;

	return (
		<Item variant="outline" className="rounded-none group">
			<ItemActions>
				<Checkbox checked={isDone} onCheckedChange={() => onToggleDone(id)} />
			</ItemActions>
			<ItemContent>
				<ItemTitle className={isDone ? "line-through text-neutral-500" : ""}>
					{title}
				</ItemTitle>
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
