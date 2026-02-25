import Backendless from "backendless";
import { toast } from "sonner";
import { create } from "zustand";

export type TAuthUserState = {
	email: string;
};

type TAuthState = {
	userState: TAuthUserState | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	refreshUser: () => Promise<void>;
	signOut: () => void;
};

export const useAuthUserStore = create<TAuthState>((set) => ({
	userState: null,
	isLoading: true,
	signIn: async (email: string, password: string) => {
		try {
			const user = await Backendless.UserService.login(email, password, true);
			set({ userState: { email: user.email || "" } });
			toast.success("Welcome back! You are successfully logged in.");
		} catch (error) {
			console.error("Error signing in:", error);
			toast.error(
				"Failed to sign in. Please check your credentials and try again.",
			);
		}
	},
	signUp: async (email: string, password: string) => {
		try {
			const user = await Backendless.UserService.register({ email, password });
			set({ userState: { email: user.email || "" } });
			await Backendless.UserService.login(email, password, true);
			toast.success("Your account has been created successfully. Welcome!");
		} catch (error) {
			console.error("Error signing up:", error);
			toast.error(
				"Failed to sign up. Please check your credentials and try again.",
			);
		}
	},
	refreshUser: async () => {
		set({ isLoading: true });
		try {
			const isValid = await Backendless.UserService.isValidLogin();
			if (isValid) {
				const user = await Backendless.UserService.getCurrentUser();
				set({ userState: { email: user.email || "" } });
			}
		} catch (error) {
			console.error("Error refreshing user:", error);
			set({ userState: null });
		} finally {
			set({ isLoading: false });
		}
	},
	signOut: () => {
		try {
			Backendless.UserService.logout();
			set({ userState: null });
			toast.success("You have been logged out successfully.");
		} catch (error) {
			console.error("Error signing out:", error);
			toast.error("Failed to log out. Please try again.");
		}
	},
}));
