import type { MouseEvent, ReactNode } from "react";
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
import { Button } from "../ui/button";

type Props = {
	children?: ReactNode;
	triggerLabel: string;
	closeLabel?: string;
	dialogTitle: string;
	dialogDescription: string;
	confirmLabel?: string;
	confirmButtonVariant?: "default" | "destructive" | "outline";
	onConfirm?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const GenericDialog = ({
	children,
	triggerLabel,
	closeLabel = "Cancel",
	dialogTitle,
	dialogDescription,
	confirmLabel = "Confirm",
	confirmButtonVariant = "default",
	onConfirm,
}: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{triggerLabel}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm md:max-w-xl">
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription>{dialogDescription}</DialogDescription>
				</DialogHeader>
				{children ? children : null}
				{!children ? (
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">{closeLabel}</Button>
						</DialogClose>
						<Button onClick={onConfirm} variant={confirmButtonVariant}>
							{confirmLabel}
						</Button>
					</DialogFooter>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

export default GenericDialog;

export const FormDialogFooter = ({
	submitLabel,
	closeLabel = "Cancel",
}: {
	submitLabel: string;
	closeLabel?: string;
}) => {
	return (
		<DialogFooter>
			<DialogClose asChild>
				<Button variant="outline">{closeLabel}</Button>
			</DialogClose>
			<Button type="submit">{submitLabel}</Button>
		</DialogFooter>
	);
};
