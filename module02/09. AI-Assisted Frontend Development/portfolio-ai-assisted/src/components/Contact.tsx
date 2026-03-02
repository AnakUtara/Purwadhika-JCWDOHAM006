import React from "react";
import { motion } from "motion/react";

export const Contact: React.FC = () => {
	return (
		<section
			id="contact"
			className="py-32 px-6 md:px-12 text-center bg-zinc-100 dark:bg-zinc-950 transition-colors duration-300"
		>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="max-w-4xl mx-auto"
			>
				<h2 className="text-4xl md:text-7xl font-serif italic mb-8 tracking-tight">
					Got a Vision? Let's Bring It to Life!
				</h2>
				<p className="text-lg opacity-60 mb-12">
					I’m always open to new freelance opportunities and creative
					collaborations. Let’s build something incredible together.
				</p>
				<a
					href="mailto:hello@dnova.com"
					className="text-2xl md:text-4xl font-bold tracking-tighter border-b-4 border-primary dark:border-white pb-2 hover:opacity-70 transition-opacity"
				>
					hello@dnova.com
				</a>
			</motion.div>
		</section>
	);
};
