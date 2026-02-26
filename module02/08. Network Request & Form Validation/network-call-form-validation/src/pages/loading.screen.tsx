import { Spinner } from "@/components/ui/spinner";

const LoadingScreen = ({
	height = "screen",
}: {
	height?: "screen" | "full";
}) => {
	return (
		<div className={`flex items-center justify-center h-${height}`}>
			<Spinner className="size-12" />
		</div>
	);
};

export default LoadingScreen;
