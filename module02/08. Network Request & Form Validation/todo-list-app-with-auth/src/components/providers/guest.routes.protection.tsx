import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import LoadingScreen from "@/pages/loading.screen";
import { Navigate, Outlet } from "react-router";

const GuestRoutesProtection = () => {
	const { userState, isLoading } = useAuthUserStore();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (userState) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default GuestRoutesProtection;
