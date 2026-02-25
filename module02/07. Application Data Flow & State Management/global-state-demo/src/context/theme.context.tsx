import { createContext, useState, type ReactNode } from "react";

interface IThemeContextState {
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<IThemeContextState | undefined>(undefined);

type Props = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
