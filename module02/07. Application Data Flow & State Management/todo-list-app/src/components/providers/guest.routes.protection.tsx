import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import { Navigate, Outlet } from "react-router";

const GuestRoutesProtection = () => {
	const { state } = useAuthUserStore();

	if (state) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default GuestRoutesProtection;
