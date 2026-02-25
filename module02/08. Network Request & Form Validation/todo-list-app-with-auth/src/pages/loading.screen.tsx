import { Spinner } from "@/components/shadcn-ui/spinner";

const LoadingScreen = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<Spinner className="size-12" />
		</div>
	);
};

export default LoadingScreen;
