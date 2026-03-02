import React from "react";
import { Instagram, Linkedin, Twitter, Dribbble } from "lucide-react";

const socialLinks = [
	{ name: "Dribbble", icon: Dribbble, href: "#" },
	{ name: "Instagram", icon: Instagram, href: "#" },
	{ name: "LinkedIn", icon: Linkedin, href: "#" },
	{ name: "Twitter", icon: Twitter, href: "#" },
];

export const Footer: React.FC = () => {
	return (
		<footer className="py-12 px-6 md:px-12 border-t border-zinc-200 dark:border-zinc-800">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-primary dark:bg-white rounded-full flex items-center justify-center text-white dark:text-primary font-bold">
						D
					</div>
					<span className="font-bold tracking-tighter text-xl">D.NOVA</span>
				</div>

				<div className="flex space-x-8 text-xs uppercase tracking-widest font-bold opacity-60">
					{socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className="hover:opacity-100 transition-opacity flex items-center gap-1"
						>
							<link.icon className="w-3 h-3" /> {link.name}
						</a>
					))}
				</div>

				<div className="text-xs uppercase tracking-widest opacity-40">
					© 2024 D.Nova Portfolio. All rights reserved.
				</div>
			</div>
		</footer>
	);
};
