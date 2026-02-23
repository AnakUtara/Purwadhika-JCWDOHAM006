import { Button } from "../shadcn-ui/button";

const SortButtons = () => (
	<div className={`flex w-40 justify-between `}>
		<Button
			variant={"link"}
			className="text-xs md:text-sm text-blue-500 hover:underline p-0"
		>
			All
		</Button>
		<Button
			variant={"link"}
			className="text-xs md:text-sm text-blue-500 hover:underline p-0"
		>
			Active
		</Button>
		<Button
			variant={"link"}
			className="text-xs md:text-sm text-blue-500 hover:underline p-0"
		>
			Completed
		</Button>
	</div>
);

export default SortButtons;
