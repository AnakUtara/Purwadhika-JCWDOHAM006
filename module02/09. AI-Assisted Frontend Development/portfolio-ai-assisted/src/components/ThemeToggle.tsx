import React from "react";
import { Contrast } from "lucide-react";

interface ThemeToggleProps {
	isDarkMode: boolean;
	onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
	return (
		<button
			onClick={onToggle}
			className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-transform"
		>
			<Contrast className="w-6 h-6" />
		</button>
	);
};
