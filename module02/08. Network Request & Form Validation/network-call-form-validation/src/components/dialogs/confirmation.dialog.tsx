import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import type { MouseEvent, ReactNode } from "react";

type Props = {
	onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
	render?: ReactNode;
	customDescription?: string;
	confirmButtonVariant?: "default" | "destructive" | "outline";
	confirmLabel?: string;
};

const ConfirmationDialog = ({
	onConfirm,
	render,
	customDescription = "This action cannot be undone.",
	confirmButtonVariant = "destructive",
	confirmLabel = "Delete",
}: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{render ? render : <Button variant="outline">Open</Button>}
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>{customDescription}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						variant={confirmButtonVariant}
						type="submit"
						onClick={onConfirm}
					>
						<Trash />
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationDialog;
