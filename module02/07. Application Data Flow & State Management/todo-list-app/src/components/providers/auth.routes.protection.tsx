import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const AuthRoutesProtection = () => {
	const { state } = useAuthUserStore();

	if (!state) {
		toast.success("You have been logged out. Please login again to continue.");
		return <Navigate to="/login" replace />;
	}

	toast.success("Welcome back! You are successfully logged in.");

	return <Outlet />;
};

export default AuthRoutesProtection;
