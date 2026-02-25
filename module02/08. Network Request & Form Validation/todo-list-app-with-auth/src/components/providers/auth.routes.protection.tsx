import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import LoadingScreen from "@/pages/loading.screen";
import { Navigate, Outlet } from "react-router";

const AuthRoutesProtection = () => {
	const { userState, isLoading } = useAuthUserStore();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (!userState) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default AuthRoutesProtection;
