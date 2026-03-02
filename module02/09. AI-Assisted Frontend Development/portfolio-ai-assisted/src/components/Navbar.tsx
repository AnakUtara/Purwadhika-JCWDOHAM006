import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navItems = ["Work", "About", "Services", "Contact"];

	return (
		<>
			<nav className="fixed w-full z-50 px-6 py-6 md:px-12 mix-blend-difference">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<a href="#" className="text-xl font-bold tracking-tighter text-white">
						D.NOVA
					</a>

					<div className="hidden md:flex space-x-12 text-sm font-medium tracking-widest text-white">
						{navItems.map((item) => (
							<a
								key={item}
								href={`#${item.toLowerCase()}`}
								className="hover:opacity-60 transition-opacity uppercase"
							>
								{item}
							</a>
						))}
					</div>

					<button
						className="md:hidden text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X /> : <Menu />}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed inset-0 z-40 bg-background-light dark:bg-background-dark flex flex-col items-center justify-center space-y-8 md:hidden"
					>
						{navItems.map((item) => (
							<a
								key={item}
								href={`#${item.toLowerCase()}`}
								className="text-3xl font-bold uppercase tracking-widest"
								onClick={() => setIsMenuOpen(false)}
							>
								{item}
							</a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
