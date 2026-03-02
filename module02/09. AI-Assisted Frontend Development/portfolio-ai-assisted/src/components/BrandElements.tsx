import React from "react";
import { SectionHeader } from "./SectionHeader";

const colors = [
	{ name: "Primary", hex: "#222222", bg: "bg-primary" },
	{ name: "Secondary", hex: "#7B7B7B", bg: "bg-[#7B7B7B]" },
	{ name: "Tertiary", hex: "#FBFBFB", bg: "bg-[#FBFBFB]" },
	{ name: "White", hex: "#FFFFFF", bg: "bg-white" },
];

export const BrandElements: React.FC = () => {
	return (
		<section className="py-24 md:py-32 bg-white dark:bg-zinc-900 transition-colors duration-300 px-6 md:px-12">
			<div className="max-w-7xl mx-auto">
				<SectionHeader label="Brand Elements" className="mb-16" />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
					<div>
						<h3 className="text-4xl font-bold mb-6 tracking-tight">
							Typography
						</h3>
						<p className="text-secondary dark:text-zinc-400 mb-12 max-w-md">
							Aeonik can be classified as a Neo-Grotesk font based on its
							geometric skeleton-inspired appearance, featuring larger
							proportions than standard Grotesk but thinner than Geometric Sans.
						</p>
						<div className="space-y-4">
							<div className="flex items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
								<span className="text-6xl font-bold mr-8 tracking-tighter leading-none">
									Aa
								</span>
								<span className="text-sm uppercase tracking-widest opacity-60">
									Aeonik Trial - Bold
								</span>
							</div>
							<div className="flex items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
								<span className="text-6xl font-normal mr-8 tracking-tighter leading-none">
									Aa
								</span>
								<span className="text-sm uppercase tracking-widest opacity-60">
									Aeonik Trial - Regular
								</span>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-4xl font-bold mb-6 tracking-tight">Colors</h3>
						<p className="text-secondary dark:text-zinc-400 mb-12 max-w-md">
							Our palette represents a minimal and elegant approach to visual
							design, allowing the content to stand out.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{colors.map((color) => (
								<div key={color.name} className="space-y-2">
									<div
										className={`w-full aspect-square ${color.bg} border border-zinc-200 dark:border-zinc-700`}
									></div>
									<p className="text-[10px] font-bold uppercase tracking-widest">
										{color.name}
										<br />
										{color.hex}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
