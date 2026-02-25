import { create } from "zustand";

export type TAuthUserState = {
	email: string;
	password: string;
};

type TAuthState = {
	state: TAuthUserState | null;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
};

export const useAuthUserStore = create<TAuthState>((set) => ({
	state: null,
	signIn: (email: string, password: string) =>
		set({ state: { email, password } }),
	signOut: () => set({ state: null }),
}));
