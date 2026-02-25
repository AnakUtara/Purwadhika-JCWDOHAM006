import { useAuthUserStore } from "@/lib/stores/auth-user.store";
import { useEffect, type ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { userState, refreshUser } = useAuthUserStore();

	console.log("User State: ", userState);

	useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	return children;
};

export default AuthProvider;
