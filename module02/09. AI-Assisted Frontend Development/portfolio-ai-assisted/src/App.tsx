/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
import { BrandElements } from "./components/BrandElements";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

	return (
		<div className="min-h-screen">
			<Navbar />
			<Hero />
			<About />
			<Portfolio />
			<BrandElements />
			<Contact />
			<Footer />
			<ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
		</div>
	);
}
