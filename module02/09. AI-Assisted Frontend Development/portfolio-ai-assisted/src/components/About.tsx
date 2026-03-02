import React from "react";
import { motion } from "motion/react";
import { IMAGES } from "../constants";
import { SectionHeader } from "./SectionHeader";

export const About: React.FC = () => {
	return (
		<section
			id="about"
			className="py-24 md:py-48 px-6 md:px-12 bg-tertiary dark:bg-zinc-900 transition-colors duration-300"
		>
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
				<div className="relative">
					<img
						src={IMAGES.workspace}
						alt="Abstract design workspace"
						className="w-full aspect-square object-cover grayscale"
						referrerPolicy="no-referrer"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="absolute -bottom-8 -right-8 bg-primary dark:bg-white p-8 shadow-2xl max-w-xs"
					>
						<h3 className="text-4xl font-serif italic mb-2 dark:text-primary">
							120%
						</h3>
						<p className="text-sm opacity-60 uppercase tracking-tighter dark:text-primary">
							Average increase in client engagement in the first 6 months.
						</p>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<SectionHeader label="About Us" className="mb-12 dark:text-white" />
					<p className="text-3xl md:text-4xl font-serif italic mb-8 dark:text-white leading-tight">
						"Design is not just what it looks like and feels like. Design is how
						it works."
					</p>
					<p className="text-lg opacity-70 mb-12 max-w-lg leading-relaxed dark:text-white">
						As a passionate UI designer, I bring creativity and precision to
						every pixel. With a deep understanding of user experience, I craft
						assets that not only look stunning but also function seamlessly
						across all platforms.
					</p>
					<div className="flex space-x-4">
						<a
							href="#"
							className="bg-primary dark:bg-white text-white dark:text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
						>
							Read More
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
