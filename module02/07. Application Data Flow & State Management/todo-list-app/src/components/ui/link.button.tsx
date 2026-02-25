import type { MouseEvent } from "react";
import { Button } from "../shadcn-ui/button";

type Props = {
	text?: string;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const LinkButton = ({ text = "Link", onClick }: Props) => {
	return (
		<Button
			variant={"link"}
			className="text-xs lg:text-sm text-blue-500 hover:underline p-0 cursor-pointer"
			onClick={onClick}
		>
			{text}
		</Button>
	);
};

export default LinkButton;
