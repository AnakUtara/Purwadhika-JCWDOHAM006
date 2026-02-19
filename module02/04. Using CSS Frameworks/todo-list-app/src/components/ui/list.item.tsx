import { Checkbox } from "../shadcn-ui/checkbox";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "../shadcn-ui/item";

type Props = {
	title: string;
	description?: string;
	isDone: boolean;
};

const ListItem = ({ title, description, isDone }: Props) => (
	<Item variant="outline" className="rounded-none">
		<ItemActions>
			<Checkbox checked={isDone} onCheckedChange={() => {}} />
		</ItemActions>
		<ItemContent>
			<ItemTitle className={isDone ? "line-through text-neutral-500" : ""}>
				{title}
			</ItemTitle>
			{/*
                Contoh conditional rendering untuk ItemDescription. 
                Jika description tidak diberikan, maka ItemDescription tidak akan dirender sama sekali. 
                Ini membantu menjaga tampilan tetap bersih dan hanya menampilkan informasi yang relevan.
                */}
			{description ? <ItemDescription>{description}</ItemDescription> : null}
		</ItemContent>
	</Item>
);

export default ListItem;
